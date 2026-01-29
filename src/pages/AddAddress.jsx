import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import addressImage from '../assets/add_address_image.svg';
import { backendUrl } from '../assets/assets';

const AddAddress = () => {
    const navigate = useNavigate();
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    // Load existing address if available
    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                toast.error('Please login first');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${backendUrl}/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.address) {
                    setFormData(response.data.address);
                }
                if (response.data.email && !formData.email) {
                    setFormData(prev => ({ ...prev, email: response.data.email }));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error('Please login first');
            navigate('/login');
            return;
        }

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.street || !formData.city) {
            toast.error('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put(
                `${backendUrl}/auth/update-address`,
                { address: formData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success('Address saved successfully!', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                });
                navigate('/cart');
            }
        } catch (error) {
            console.error('Error saving address:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Failed to save address';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Left Side - Form */}
                    <div className="w-full">
                        <h1 className="text-2xl sm:text-3xl font-normal text-gray-700 mb-8">
                            Add Shipping <span className="text-primary font-semibold">Address</span>
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                required
                            />

                            {/* Street */}
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Street"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                required
                            />

                            {/* City & State */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>

                            {/* Zip Code & Country */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    placeholder="Zip code"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>

                            {/* Phone */}
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                            />

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-[#3ea175] text-white py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'SAVING...' : 'SAVE ADDRESS'}
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Image */}
                    <div className="hidden lg:flex items-center justify-center">
                        <img
                            src={addressImage}
                            alt="Add Address"
                            className="w-full max-w-md"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AddAddress;
