import React from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import cartIcon from '../assets/cart_icon.svg';

const AddToCartButton = ({ productId }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const { token } = useAuth();
    const quantity = cartItems[productId] || 0;

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if user is logged in
        if (!token) {
            toast.error('Please Login First', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#FF4444',
                    secondary: '#fff',
                },
            });
            return;
        }

        addToCart(productId);
        if (quantity === 0) {
            toast.success('Added to Cart', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#5CBF6B',
                    secondary: '#fff',
                },
            });
        }
    };

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity === 1) {
            toast.error('Removed From Cart', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
        }
        removeFromCart(productId);
    };

    if (quantity > 0) {
        return (
            <div className="flex items-center justify-between gap-4 bg-[#D5F2DC] text-primary px-3 py-2 rounded-xl border border-[#BDEBC8] min-w-[110px]">
                <button
                    onClick={handleRemove}
                    className="w-6 h-6 flex items-center justify-center font-black text-xl hover:scale-125 transition-transform"
                >
                    −
                </button>
                <span className="font-black text-[16px] text-primary">{quantity}</span>
                <button
                    onClick={handleAdd}
                    className="w-6 h-6 flex items-center justify-center font-black text-xl hover:scale-125 transition-transform"
                >
                    +
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1.5 bg-[#F2FAF7] text-primary p-2 sm:px-4 sm:py-2 rounded-xl text-[13px] font-black hover:bg-primary hover:text-white transition-all duration-300 border border-[#E8F5EE] min-w-[38px] min-h-[38px] group/btn"
        >
            <img
                src={cartIcon}
                alt=""
                className="w-5 h-5 brightness-100 group-hover/btn:brightness-0 group-hover/btn:invert transition-all"
            />
            <span className="hidden sm:inline">Add</span>
        </button>
    );
};

export default AddToCartButton;
