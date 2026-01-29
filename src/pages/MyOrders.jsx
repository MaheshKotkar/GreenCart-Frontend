import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data/allProducts';
import axios from 'axios';
import { backendUrl } from '../assets/assets';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { token } = useAuth();

    const [products, setProducts] = useState([]);

    const fetchOrders = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${backendUrl}/order/user-orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data.reverse()); // Show latest first
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${backendUrl}/product/list`); // fetching all so we can show images of disabled products too
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchOrders();
        fetchProducts();
    }, [token]);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="mb-12">
                    <h1 className="text-[24px] sm:text-[32px] font-black text-dark-text uppercase tracking-tight inline-block relative">
                        MY ORDERS
                        <span className="absolute -bottom-2 left-0 w-1/3 h-[3px] bg-primary rounded-full"></span>
                    </h1>
                </div>

                <div className="space-y-8">
                    {orders.length > 0 ? (
                        orders.map((order, orderIdx) => (
                            <div key={orderIdx} className="space-y-6">
                                {order.items.map((item, itemIdx) => {
                                    // Find product in dynamic list or fallback to item details if stored (item only has name/qty/price usually)
                                    // Actually allProducts static import should be removed/replaced.
                                    const product = products.find(p => p.name === item.name) || {};
                                    return (
                                        <div key={`${orderIdx}-${itemIdx}`} className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 hover:shadow-xl transition-all duration-500">
                                            {/* Order Header Info - Top Row */}
                                            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-50 text-[11px] sm:text-[13px] text-gray-500 font-bold uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <span>OrderId :</span>
                                                    <span className="text-gray-400 font-medium normal-case break-all">{order._id}</span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                                    <div className="flex gap-2">
                                                        <span>Payment :</span>
                                                        <span className="text-gray-400 font-medium">{order.paymentMethod}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span>Total Amount :</span>
                                                        <span className="text-gray-400 font-medium">${order.amount}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Body - Main Content */}
                                            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">
                                                {/* Product Image Container */}
                                                <div className="w-full md:w-32 flex justify-center md:block">
                                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#F2FAF7] rounded-3xl flex items-center justify-center p-4 transition-colors duration-300 group-hover:bg-primary/5">
                                                        <img
                                                            src={product?.image}
                                                            alt={item.name}
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Product & Order Details Wrapper */}
                                                <div className="flex-1 w-full flex flex-col md:flex-row items-center md:items-start gap-6">
                                                    {/* Product Info */}
                                                    <div className="flex-1 text-center md:text-left">
                                                        <h3 className="text-[17px] sm:text-[20px] font-black text-dark-text mb-1.5 leading-tight">{item.name}</h3>
                                                        <p className="text-gray-400 text-[12px] sm:text-[13px] font-bold uppercase tracking-wide">Category: {product?.category}</p>
                                                    </div>

                                                    {/* Order Details */}
                                                    <div className="flex-1 flex flex-col items-center md:items-start gap-1 text-[13px] sm:text-[14px]">
                                                        <p className="text-gray-500 font-bold">Quantity: <span className="text-gray-400 font-medium">{item.quantity}</span></p>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-gray-500 font-bold">Status:</p>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                                                <span className="text-primary font-black uppercase text-[11px] tracking-wider">Order Placed</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-500 font-bold">Date: <span className="text-gray-400 font-medium">{new Date(order.date).toLocaleDateString()}</span></p>
                                                    </div>

                                                    {/* Price Information */}
                                                    <div className="md:w-auto text-center md:text-right flex flex-col justify-center">
                                                        <div className="bg-[#F2FAF7] px-4 py-2 rounded-xl">
                                                            <p className="text-primary font-black text-[18px] sm:text-[20px] whitespace-nowrap">
                                                                Amount: ${item.price * item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[32px]">
                            <p className="text-gray-400 font-bold text-lg italic">You haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MyOrders;
