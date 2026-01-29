import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a spinner
    }

    if (!token || !user) {
        return <Navigate to="/seller-login" />;
    }

    if (user.role !== 'admin') {
        toast.error('Access Denied: Admins only', { id: 'admin-access-denied' });
        return <Navigate to="/" />; // Or back to login
    }

    return children;
};

export default AdminRoute;
