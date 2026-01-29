import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://192.168.1.101:5000/api/order/all-orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await axios.post('http://192.168.1.101:5000/api/order/update-status', {
                orderId,
                payment: newStatus
            });
            if (response.data.success) {
                // Update local state
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, payment: newStatus } : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-gray-500">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="w-full px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Orders List</h2>

            {orders.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No orders found
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                        >
                            {/* Mobile Layout - Stacked */}
                            <div className="flex lg:hidden flex-col space-y-4">
                                {/* Top Row: Icon + Products */}
                                <div className="flex items-start space-x-4">
                                    {/* Product Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-8 h-8 sm:w-9 sm:h-9 text-emerald-500"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="space-y-1">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="text-xs sm:text-sm">
                                                    <span className="text-gray-800 font-medium">
                                                        {item.name} {item.size}
                                                    </span>
                                                    <span className="text-emerald-600 font-semibold ml-1">
                                                        x {item.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price - Mobile */}
                                    <div className="flex-shrink-0">
                                        <div className="text-base sm:text-lg font-bold text-gray-900">
                                            ${order.amount}
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Details - Mobile */}
                                <div className="border-t pt-3">
                                    <div className="text-xs sm:text-sm text-gray-800 font-medium mb-1">
                                        {order.userName} ({order.userEmail})
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                                        {order.currentUserAddress || order.address}
                                    </div>
                                </div>

                                {/* Payment Details - Mobile */}
                                <div className="border-t pt-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                                    <div className="flex flex-col space-y-1">
                                        <div>
                                            <span className="text-gray-500">Method: </span>
                                            <span className="text-gray-800 font-medium">{order.paymentMethod || 'COD'}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Date: </span>
                                            <span className="text-gray-800 font-medium">{formatDate(order.date)}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Payment: </span>
                                            <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {order.payment ? 'Paid' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Approve Button - Mobile */}
                                    {!order.payment && (order.paymentMethod === 'COD' || !order.paymentMethod) && (
                                        <button
                                            onClick={() => handleStatusUpdate(order._id, true)}
                                            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors flex items-center space-x-1 font-semibold text-xs"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Approve</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Desktop Layout - Horizontal */}
                            <div className="hidden lg:flex items-center justify-between">
                                {/* Product Icon */}
                                <div className="flex-shrink-0 mr-6">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10 text-emerald-500"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-1">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="text-sm">
                                                <span className="text-gray-800 font-medium">
                                                    {item.name} {item.size}
                                                </span>
                                                <span className="text-emerald-600 font-semibold ml-1">
                                                    x {item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div className="flex-1 min-w-0 mx-6">
                                    <div className="text-sm text-gray-800 font-medium mb-1">
                                        {order.userName}
                                    </div>
                                    <div className="text-xs text-blue-600 mb-1">
                                        {order.userEmail}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {order.currentUserAddress || order.address}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex-shrink-0 mx-6">
                                    <div className="text-lg font-bold text-gray-900">
                                        ${order.amount}
                                    </div>
                                </div>

                                {/* Payment & Status Details */}
                                <div className="flex-shrink-0 text-right flex flex-col items-end space-y-2">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-0.5">
                                            Method: {order.paymentMethod || 'COD'}
                                        </div>
                                        <div className="text-sm text-gray-600 mb-0.5">
                                            Date: {formatDate(order.date)}
                                        </div>
                                        <div className={`text-sm font-medium ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                                            Payment: {order.payment ? 'Paid' : 'Pending'}
                                        </div>
                                    </div>

                                    {/* Approve Button - Desktop */}
                                    {!order.payment && (order.paymentMethod === 'COD' || !order.paymentMethod) && (
                                        <button
                                            onClick={() => handleStatusUpdate(order._id, true)}
                                            className="px-4 py-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors flex items-center space-x-1 font-semibold text-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Approve</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
