import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { backendUrl } from '../assets/assets';

import AddToCartButton from '../components/AddToCartButton';

import mainBannerBg from '../assets/main_banner_bg.png';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActiveProducts = async () => {
        try {
            const res = await axios.get(`${backendUrl}/product/active`);
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchActiveProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50 relative overflow-hidden">
            {/* Background Pattern Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(${mainBannerBg})`, backgroundSize: '400px' }}></div>

            <Header />

            <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight inline-block relative">
                        ALL PRODUCTS
                        <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-primary rounded-full"></span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white border border-gray-100/100 rounded-3xl p-4 flex flex-col hover:shadow-2xl transition-all duration-500 group relative">
                            {/* Product Image */}
                            <div className="relative aspect-square overflow-hidden mb-4 sm:mb-5 rounded-2xl flex items-center justify-center p-4 bg-gray-50/50 group-hover:bg-primary/5 transition-colors duration-500">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col">
                                <span className="text-[11px] sm:text-[13px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{product.category}</span>
                                <h3 className="text-[15px] sm:text-[17px] font-[900] text-dark-text leading-tight mb-3">{product.name}</h3>

                                {/* Rating */}
                                <div className="flex items-center gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < product.rating ? 'text-[#FFCE31]' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-[11px] sm:text-[13px] text-gray-400 font-bold ml-1.5">(4)</span>
                                </div>

                                <div className="mt-auto flex items-center justify-between gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-[18px] sm:text-[20px] font-black text-primary leading-none">${product.price}</span>
                                        <span className="text-[12px] sm:text-[13px] text-gray-400 font-bold line-through mt-0.5 opacity-70">${product.oldPrice}</span>
                                    </div>

                                    <AddToCartButton productId={product.name} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllProducts;
