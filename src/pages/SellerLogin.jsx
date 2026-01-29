import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout, token } = useAuth();
    const navigate = useNavigate();
    const hasLoggedOut = React.useRef(false);

    // Ensure clean session for seller login
    React.useEffect(() => {
        // We only want to do this once on mount
        if (!hasLoggedOut.current) {
            // Accessing current state from context might be stale if we don't depend on it,
            // but for a mount effect, we want the INITIAL state.
            const currentToken = localStorage.getItem('token');
            if (currentToken) {
                logout(false); // Force silent logout only if user is logged in
            }
            hasLoggedOut.current = true;
        }
    }, []); // STICK TO EMPTY ARRAY: Only run on mount!

    const onSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            // Check role - actually login function sets user state, but it might be async/batched. 
            // Better to rely on the backend response or check token/user in a useEffect or logic.
            // For now, let's assume login was successful and we redirect. 
            // The protected route will handle the actual access check.
            // But we can check role if we returned user from login or can access it immediately.
            // Let's modify login in AuthContext to return the user object or role? 
            // Currently it returns true/false.
            // Simple approach: Redirect to admin, if protected route fails it redirects back.
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Seller Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access your seller dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-[#3ea978] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellerLogin;
