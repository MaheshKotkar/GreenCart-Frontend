import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
                    {/* Hamburger Menu - Mobile */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-1.5 xs:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img src="/src/assets/logo.svg" alt="GreenCart" className="h-6 xs:h-7 sm:h-8" />
                    </Link>

                    {/* Navigation Links - Desktop Only (lg+) */}
                    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 ml-auto">
                        <Link to="/admin" className="px-4 py-1.5 border border-gray-200 rounded-full text-gray-500 hover:text-primary hover:border-primary text-[14px] font-medium transition-all duration-300">
                            Seller Dashboard
                        </Link>
                        <Link to="/" className="text-primary text-[15px] font-extrabold">
                            Home
                        </Link>
                        <Link to="/all-products" className="text-gray-600 hover:text-primary text-[15px] font-bold transition">
                            All Product
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products"
                                className="w-full px-5 py-2.5 pr-12 text-[14px] border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all placeholder:text-gray-400 font-medium"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                <svg className="w-4 h-4 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-1.5 xs:space-x-4 sm:space-x-5">
                        {/* Search icon for mobile only */}
                        <button className="sm:hidden p-1.5 xs:p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <Link to="/cart" className="relative transition-all group p-1 xs:p-1.5 hover:bg-gray-50 rounded-full">
                            <svg
                                className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 transform group-hover:-rotate-12 transition-all duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="absolute top-0 right-0 bg-primary text-white text-[8px] xs:text-[9px] font-black rounded-full w-4 h-4 xs:w-5 xs:h-5 flex items-center justify-center border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                                {cartCount}
                            </span>
                        </Link>

                        {!token ? (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-primary text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 rounded-full text-[13px] xs:text-[14px] sm:text-[15px] font-black hover:bg-[#3ea175] transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 whitespace-nowrap"
                            >
                                Login
                            </button>
                        ) : (
                            <div className="relative group">
                                <button className="p-0.5 border-2 border-transparent group-hover:border-primary rounded-full transition-all duration-300">
                                    <img
                                        src="/src/assets/profile_icon.png"
                                        alt="Profile"
                                        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full shadow-sm"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[70] translate-y-2 group-hover:translate-y-0">
                                    <div className="w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-1.5">
                                        <Link
                                            to="/my-orders"
                                            className="flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                navigate('/login');
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors border-t border-gray-50"
                                        >
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 space-y-3 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-primary bg-primary/5 rounded-xl">
                        Home
                    </Link>
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-50 rounded-xl">
                        Seller Dashboard
                    </Link>
                    <Link to="/all-products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-50 rounded-xl">
                        All Product
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
