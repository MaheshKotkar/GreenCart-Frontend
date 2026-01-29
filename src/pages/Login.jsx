import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign Up');
    const { login, signup, user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentState === 'Sign Up') {
            const success = await signup(name, email, password);
            if (success) navigate('/');
        } else {
            const success = await login(email, password);
            if (success) navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="flex items-center justify-center py-20 px-4 bg-gray-50/30">
                <div className="w-full max-w-[450px] bg-white rounded-[24px] shadow-2xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] sm:text-[32px] font-black text-dark-text tracking-tight">
                            <span className="text-primary">User</span> {currentState}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {currentState === 'Sign Up' && (
                            <div className="space-y-2">
                                <label className="block text-[14px] sm:text-[15px] font-bold text-gray-500 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="type here"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-[14px] sm:text-[15px] font-bold text-gray-500 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="type here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[14px] sm:text-[15px] font-bold text-gray-500 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="type here"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-start text-[14px] sm:text-[15px] pt-2">
                            {currentState === 'Login' ? (
                                <p className="text-gray-500 font-medium">
                                    Don't have an account? <span onClick={() => setCurrentState('Sign Up')} className="text-primary font-bold cursor-pointer hover:underline">click here</span>
                                </p>
                            ) : (
                                <p className="text-gray-500 font-medium">
                                    Already have account? <span onClick={() => setCurrentState('Login')} className="text-primary font-bold cursor-pointer hover:underline">click here</span>
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-[#3ea175] text-white py-4 rounded-xl font-black text-[16px] transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 mt-4"
                        >
                            {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;
