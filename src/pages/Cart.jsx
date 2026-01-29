import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/allProducts';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendUrl, getImageUrl } from '../assets/assets';

const Cart = () => {
    const { cartItems, cartCount, clearFromCart, setCartItems } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [products, setProducts] = useState([]);
    const [userAddress, setUserAddress] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${backendUrl}/product/list`); // fetching all products to ensure even disabled ones show in cart if previously added, or just active. active is safer for now but user might have disabled items. Let's start with all or active? Active is standard.
                // Wait, if a product is disabled, should it be in cart? Maybe not. Let's fetch active.
                // Actually, fetch 'active' is better.
                const resActive = await axios.get(`${backendUrl}/product/active`);
                setProducts(resActive.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();

        // Fetch user address if logged in
        const fetchUserAddress = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${backendUrl}/auth/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserAddress(response.data.address);
                } catch (err) {
                    console.error('Error fetching address:', err);
                }
            }
        };
        fetchUserAddress();
    }, [token]);

    // Merge static and dynamic products? Or just use dynamic?
    // The previous static products are now seeded in DB. So just DB products should be fine.
    // However, the `name` is the key.

    const cartProducts = products.filter(p => cartItems[p.name]);
    const subtotal = cartProducts.reduce((acc, p) => acc + (p.price * cartItems[p.name]), 0);
    const tax = subtotal * 0.02;
    const total = subtotal + tax;

    const handleRemove = (productId) => {
        clearFromCart(productId);
        toast.error('Removed From Cart', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontWeight: 'bold',
            },
        });
    };

    const handlePlaceOrder = async () => {
        if (!token) {
            toast.error('Please login to place order');
            navigate('/login');
            return;
        }

        if (cartCount === 0) {
            toast.error('Your cart is empty');
            return;
        }

        if (paymentMethod === 'cod') {
            try {
                const formattedAddress = userAddress ?
                    [userAddress.street, userAddress.city, userAddress.state, userAddress.zipCode, userAddress.country].filter(Boolean).join(', ') :
                    'Bangalore, Bangalore, Karnataka, India';

                const orderData = {
                    items: cartProducts.map(p => ({
                        name: p.name,
                        quantity: cartItems[p.name],
                        price: p.price,
                        size: p.size || ''
                    })),
                    amount: total,
                    paymentMethod: 'COD',
                    address: formattedAddress
                };

                const res = await axios.post(`${backendUrl}/order/place`, orderData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.success) {
                    setCartItems({});
                    toast.success('Order Placed Successfully!', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                            fontWeight: 'bold',
                        },
                    });
                    navigate('/my-orders');
                }
            } catch (err) {
                toast.error(err.response?.data?.message || 'Order placement failed');
            }
        } else if (paymentMethod === 'online') {
            // Stripe payment flow
            try {
                toast.loading('Redirecting to payment...', { id: 'stripe-loading' });

                const formattedAddress = userAddress ?
                    [userAddress.street, userAddress.city, userAddress.state, userAddress.zipCode, userAddress.country].filter(Boolean).join(', ') :
                    'Bangalore, Bangalore, Karnataka, India';

                const orderData = {
                    items: cartProducts.map(p => ({
                        name: p.name,
                        quantity: cartItems[p.name],
                        price: p.price * cartItems[p.name],
                        size: p.size || ''
                    })),
                    amount: total,
                    address: formattedAddress
                };

                const res = await axios.post(
                    `${backendUrl}/payment/create-checkout-session`,
                    orderData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                toast.dismiss('stripe-loading');

                if (res.data.url) {
                    // Redirect to Stripe checkout
                    window.location.href = res.data.url;
                } else {
                    toast.error('Failed to create payment session');
                }
            } catch (err) {
                toast.dismiss('stripe-loading');
                toast.error(err.response?.data?.message || 'Payment initialization failed');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Column - Cart Items */}
                    <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-8">
                            <h1 className="text-2xl sm:text-[32px] font-black text-dark-text tracking-tight">Shopping Cart</h1>
                            <span className="text-primary font-medium text-sm sm:text-base">{cartCount} items</span>
                        </div>

                        {/* Cart Table Headers - Desktop */}
                        <div className="hidden md:flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
                            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Product Details</span>
                            <div className="flex gap-20 lg:gap-32 mr-10">
                                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Subtotal</span>
                                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Action</span>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-6">
                            {cartProducts.length > 0 ? (
                                cartProducts.map((product) => (
                                    <div key={product.name} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-50 gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100">
                                                <img src={getImageUrl(product.image)} alt={product.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-black text-dark-text text-[17px]">{product.name}</h3>
                                                <p className="text-gray-400 text-sm mt-1 font-medium">Weight: N/A</p>
                                                <p className="text-gray-400 text-sm mt-0.5 font-medium flex items-center gap-1">
                                                    Qty: {cartItems[product.name]}
                                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-20 lg:gap-32 md:mr-10">
                                            <span className="font-black text-dark-text text-[18px] md:w-20 text-center">${product.price * cartItems[product.name]}</span>
                                            <button
                                                onClick={() => handleRemove(product.name)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-500/80 text-red-500/80 hover:bg-red-500 hover:text-white transition-all duration-300"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center text-gray-400 font-medium">
                                    Your cart is currently empty.
                                </div>
                            )}
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-10">
                            <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h14" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>

                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="w-full lg:w-[380px]">
                        <div className="bg-[#F8F9FA] rounded-[24px] p-6 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-black text-dark-text mb-6">Order Summary</h2>

                            <hr className="border-gray-200 mb-6" />

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">DELIVERY ADDRESS</span>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <p className="text-[14px] text-gray-600 leading-snug">
                                        {userAddress ? (
                                            <>
                                                {userAddress.firstName} {userAddress.lastName}<br />
                                                {userAddress.street && `${userAddress.street}, `}
                                                {userAddress.city && `${userAddress.city}, `}
                                                {userAddress.state && `${userAddress.state}, `}
                                                {userAddress.zipCode && `${userAddress.zipCode}, `}
                                                {userAddress.country || ''}
                                                {userAddress.phone && <><br />Phone: {userAddress.phone}</>}
                                            </>
                                        ) : (
                                            <span className="text-gray-400 italic">No address added yet</span>
                                        )}
                                    </p>
                                    <button
                                        onClick={() => navigate('/add-address')}
                                        className="text-primary font-bold text-[14px] hover:underline whitespace-nowrap"
                                    >
                                        {userAddress ? 'Change' : 'Add'}
                                    </button>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="mb-8">
                                <label htmlFor="payment-method" className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    PAYMENT METHOD
                                </label>
                                <div className="relative">
                                    <select
                                        id="payment-method"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-dark-text appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                    >
                                        <option value="cod">Cash On Delivery</option>
                                        <option value="online">Online Payment</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-200 mb-6" />

                            {/* Calculations */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] font-bold text-gray-500">Price</span>
                                    <span className="text-[14px] font-bold text-dark-text">${subtotal.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] font-bold text-gray-500">Shipping Fee</span>
                                    <span className="text-[14px] font-bold text-primary">Free</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] font-bold text-gray-500">Tax (2%)</span>
                                    <span className="text-[14px] font-bold text-dark-text">${tax.toFixed(1)}</span>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                                    <span className="text-base font-black text-dark-text">Total Amount:</span>
                                    <span className="text-base font-black text-dark-text">${total.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-primary hover:bg-[#3ea175] text-white py-4 rounded-xl font-black text-[15px] transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
