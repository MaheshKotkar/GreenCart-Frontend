import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Add Product',
            path: '/admin/add-product',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
            ),
        },
        {
            name: 'Product List',
            path: '/admin/product-list',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
            ),
        },
        {
            name: 'Add Category',
            path: '/admin/add-category',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
            ),
        },
        {
            name: 'Category List',
            path: '/admin/category-list',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            ),
        },
        {
            name: 'Orders',
            path: '/admin/orders',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
            ),
        },
    ];

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white border-r border-gray-200 flex flex-col
                transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
        >
            {/* Mobile Sidebar Close Button */}
            <div className="flex items-center justify-between px-6 py-4 lg:hidden border-b border-gray-100">
                <span className="font-bold text-primary">Menu</span>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <nav className="flex-1 py-4">
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path || (item.path === '/admin/add-product' && currentPath === '/admin');
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 px-6 py-4 transition-all duration-200 relative ${isActive
                                    ? 'bg-[#F2FAF7] text-[#4FBF8B] border-r-[3px] border-[#4FBF8B]'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`${isActive ? 'text-[#4FBF8B]' : 'text-gray-400'}`}>
                                    {item.icon}
                                </div>
                                <span className={`font-semibold tracking-wide ${isActive ? 'text-[#000000]' : 'text-gray-600'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => {
                        navigate('/'); // Navigate first to unmount AdminRoute
                        setTimeout(() => {
                            logout();
                            setIsOpen(false);
                        }, 100);
                    }}
                    className="flex items-center space-x-3 px-6 py-4 w-full text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-semibold tracking-wide">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
