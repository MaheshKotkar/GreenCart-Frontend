import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCartButton from './AddToCartButton';
import { backendUrl } from '../assets/assets';

const ExploreDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDeals = async () => {
        try {
            const res = await axios.get(`${backendUrl}/product/active`);
            // Filter products that have a significant discount or just take a few for the deals section
            const deals = res.data
                .filter(p => p.oldPrice > p.price)
                .sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price))
                .slice(0, 4);

            setProducts(deals);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, []);

    if (loading || products.length === 0) return null;

    return (
        <section id="explore-deals" className="py-16 lg:py-24 bg-gray-50/50 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="space-y-2">
                        <span className="text-primary font-black uppercase tracking-[0.2em] text-[12px] sm:text-[14px]">Limited Time Offers</span>
                        <h2 className="text-[32px] sm:text-[44px] font-[1000] text-dark-text leading-none tracking-tight">
                            Explore Today's <span className="text-primary italic">Hot Deals</span>
                        </h2>
                        <p className="text-gray-500 font-medium text-[15px] sm:text-[17px] max-w-xl">
                            Grab your favorites at unbeatable prices before they're gone. Freshness guaranteed at a fraction of the cost.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {products.map((product, index) => {
                        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                        return (
                            <div key={index} className="group relative bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full overflow-hidden">
                                {/* Discount Badge */}
                                <div className="absolute top-6 right-6 z-10 bg-red-500 text-white text-[12px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-red-500/20 animate-pulse">
                                    {discount}% OFF
                                </div>

                                {/* Product Image Container */}
                                <div className="relative aspect-square mb-8 rounded-3xl bg-gray-50 flex items-center justify-center p-6 group-hover:bg-primary/5 transition-colors duration-500">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="max-w-[90%] max-h-[90%] object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">{product.category}</span>
                                        <div className="flex items-center text-[#FFCE31]">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span className="text-[11px] font-black ml-1">4.9</span>
                                        </div>
                                    </div>

                                    <h3 className="text-[18px] sm:text-[20px] font-black text-dark-text leading-tight group-hover:text-primary transition-colors duration-300">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[24px] font-[1000] text-primary">${product.price}</span>
                                        <span className="text-[14px] text-gray-400 line-through font-bold">${product.oldPrice}</span>
                                    </div>
                                </div>

                                {/* Add to Cart */}
                                <div className="mt-6 pt-6 border-t border-gray-50">
                                    <AddToCartButton productId={product.name} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExploreDeals;
