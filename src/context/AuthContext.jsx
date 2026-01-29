import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const backendUrl = 'http://192.168.1.101:5000/api';

    const fetchUser = async (authToken) => {
        try {
            const res = await axios.get(`${backendUrl}/auth/user`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setUser(res.data);
        } catch (err) {
            setToken(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUser(token);
        } else {
            localStorage.removeItem('token');
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${backendUrl}/auth/login`, { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            toast.success('Login Successful!');
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post(`${backendUrl}/auth/signup`, { name, email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            toast.success('Account Created Successfully!');
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed');
            return false;
        }
    };

    const logout = (showToast = true) => {
        setToken(null);
        setUser(null);
        if (showToast) {
            toast.success('Logout Successfully', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
