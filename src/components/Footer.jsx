import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../assets/assets';

import logo from '../assets/logo.svg';

const Footer = () => {
    const [categories, setCategories] = useState([]);

    const defaultCategories = [
        { name: 'Organic veggies', slug: 'organic-veggies' },
        { name: 'Cold Drinks', slug: 'cold-drinks' },
        { name: 'Dairy Products', slug: 'dairy-products' },
        { name: 'Bakery & Breads', slug: 'bakery-breads' },
        { name: 'Grains & Cereals', slug: 'grains-cereals' },
        { name: 'Chips', slug: 'chips' },
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${backendUrl}/category/list`);
                if (res.data && res.data.length > 0) {
                    const formatted = res.data.slice(0, 6).map(cat => ({
                        name: cat.name,
                        slug: cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                    }));
                    setCategories(formatted);
                } else {
                    setCategories(defaultCategories);
                }
            } catch (err) {
                console.error(err);
                setCategories(defaultCategories);
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer className="bg-[#fbfcfa] border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="xl:col-span-2 pr-0 lg:pr-12">
                        <Link to="/" className="inline-block mb-6">
                            <img src={logo} alt="GreenCart" className="h-9" />
                        </Link>
                        <p className="text-gray-500 text-[15px] leading-loose mb-8 max-w-sm">
                            Experience the future of grocery shopping. We deliver freshness, quality, and savings directly to your doorstep with our state-of-the-art delivery network.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.072 4.85c-.056 1.17-.251 1.805-.419 2.227-.216.56-.478.96-.893 1.38-.419.419-.818.679-1.38.896-.421.164-1.057.36-2.227.413-1.266.057-1.645.07-4.85.07s-3.584-.015-4.85-.072c-1.17-.056-1.805-.251-2.227-.419-.56-.216-.96-.478-1.38-.893-.419-.419-.679-.818-.896-1.38-.164-.421-.36-1.057-.413-2.227-.057-1.266-.07-1.645-.07-4.85s.015-3.584.072-4.85c.056-1.17.251-1.805.419-2.227.216-.56.478-.96.893-1.38.419-.419.818-.679 1.38-.896.421-.164 1.057-.36 2.227-.413 1.266-.057 1.645-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 className="text-dark-text font-black text-[17px] mb-8 uppercase tracking-wider">Quick Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-500 hover:text-primary font-bold text-[15px] transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>Home</Link></li>
                            <li><Link to="/all-products" className="text-gray-500 hover:text-primary font-bold text-[15px] transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>All Products</Link></li>
                            <li><Link to="/cart" className="text-gray-500 hover:text-primary font-bold text-[15px] transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>My Cart</Link></li>
                            <li><Link to="/my-orders" className="text-gray-500 hover:text-primary font-bold text-[15px] transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>Order Tracking</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-dark-text font-black text-[17px] mb-8 uppercase tracking-wider">Top Categories</h4>
                        <ul className="space-y-4">
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <Link to={`/category/${cat.slug}`} className="text-gray-500 hover:text-primary font-bold text-[15px] transition-all duration-300 flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-dark-text font-black text-[17px] mb-8 uppercase tracking-wider">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-dark-text font-bold text-[14px] mb-1">Office Location</p>
                                    <p className="text-gray-500 text-[13px] leading-relaxed">123 Green Valley, SukhSagar Nagar,<br />Pune, MH 411001</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-dark-text font-bold text-[14px] mb-1">Email Support</p>
                                    <p className="text-gray-500 text-[13px]">help@greencart.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>



                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-400 font-bold text-[14px]">
                        © {new Date().getFullYear()} GreenCart. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-gray-400 hover:text-primary font-bold text-[13px] transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-primary font-bold text-[13px] transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-primary font-bold text-[13px] transition-colors">Help Center</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
