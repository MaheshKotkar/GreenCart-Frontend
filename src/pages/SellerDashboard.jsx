import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import OrdersList from '../components/OrdersList';
import AddCategory from '../components/AddCategory';
import ListCategory from '../components/ListCategory';

import logo from '../assets/logo.svg';

const SellerDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Dashboard Header */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
                <div className="flex items-center space-x-4">
                    {/* Hamburger Menu - Mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 lg:hidden hover:bg-gray-100 rounded-lg transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="GreenCart" className="h-7 md:h-8" />
                    </Link>
                </div>
                <div className="flex items-center space-x-3 md:space-x-6">
                    <span className="text-gray-600 font-medium text-sm md:text-base hidden sm:inline">Hi! Admin</span>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <Routes>
                            <Route path="add-product" element={<AddProduct />} />
                            <Route path="/" element={<AddProduct />} />
                            <Route path="product-list" element={<ListProduct />} />
                            <Route path="orders" element={<OrdersList />} />
                            <Route path="add-category" element={<AddCategory />} />
                            <Route path="category-list" element={<ListCategory />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
