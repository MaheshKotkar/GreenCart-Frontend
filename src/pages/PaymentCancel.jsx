import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-black text-dark-text">Payment Cancelled</h2>
                    <p className="text-gray-500">
                        Your payment was cancelled. No charges were made to your account.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                            onClick={() => navigate('/cart')}
                            className="px-6 py-3 bg-primary hover:bg-[#3ea175] text-white rounded-xl font-bold transition-all duration-300"
                        >
                            Return to Cart
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-dark-text rounded-xl font-bold transition-all duration-300"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentCancel;
