import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { setCartItems } = useCart();
    const [processing, setProcessing] = useState(true);
    const [verified, setVerified] = useState(false);
    const hasVerified = useRef(false); // Prevent duplicate calls

    useEffect(() => {
        const verifyPayment = async () => {
            // Prevent duplicate verification (React StrictMode runs useEffect twice)
            if (hasVerified.current) return;
            hasVerified.current = true;

            const sessionId = searchParams.get('session_id');

            if (!sessionId) {
                toast.error('Invalid payment session');
                navigate('/cart');
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:5000/api/payment/verify-session',
                    { sessionId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    setVerified(true);
                    setProcessing(false);
                    // Clear cart on frontend
                    setCartItems({});

                    // Only show toast if this is a new order (not already existed)
                    if (!response.data.alreadyExists) {
                        toast.success('Payment successful! Order placed.');
                    }

                    // Redirect to orders page after 3 seconds
                    setTimeout(() => {
                        navigate('/my-orders');
                    }, 3000);
                }
            } catch (error) {
                console.error('Verification error:', error);
                setProcessing(false);
                toast.error('Payment verification failed');
                setTimeout(() => {
                    navigate('/cart');
                }, 3000);
            }
        };

        verifyPayment();
    }, [searchParams, token, navigate, setCartItems]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full text-center">
                    {processing ? (
                        <div className="space-y-6">
                            <div className="w-20 h-20 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <h2 className="text-2xl font-black text-dark-text">Verifying Payment...</h2>
                            <p className="text-gray-500">Please wait while we confirm your payment</p>
                        </div>
                    ) : verified ? (
                        <div className="space-y-6">
                            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-black text-dark-text">Payment Successful!</h2>
                            <p className="text-gray-500">Your order has been placed successfully.</p>
                            <p className="text-sm text-gray-400">Redirecting to your orders...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-black text-dark-text">Verification Failed</h2>
                            <p className="text-gray-500">We couldn't verify your payment.</p>
                            <p className="text-sm text-gray-400">Redirecting to cart...</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentSuccess;
