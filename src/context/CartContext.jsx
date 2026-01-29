import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({}); // { productId: quantity }
    const { token } = useAuth();
    const backendUrl = 'http://192.168.1.101:5000/api';

    const [orders, setOrders] = useState([]);

    const addToCart = async (productId) => {
        let cartData = { ...cartItems };
        cartData[productId] = (cartData[productId] || 0) + 1;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/cart/update`, { cartData }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const removeFromCart = async (productId) => {
        let cartData = { ...cartItems };
        if (cartData[productId] > 1) {
            cartData[productId] -= 1;
        } else {
            delete cartData[productId];
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/cart/update`, { cartData }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const clearFromCart = async (productId) => {
        let cartData = { ...cartItems };
        delete cartData[productId];
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/cart/update`, { cartData }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getCartData = async (authToken) => {
        try {
            const res = await axios.get(`${backendUrl}/cart/get`, { headers: { Authorization: `Bearer ${authToken}` } });
            setCartItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (token) {
            getCartData(token);
        } else {
            setCartItems({}); // Reset cart on logout
        }
    }, [token]);

    const cartCount = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, orders, setOrders, setCartItems, addToCart, removeFromCart, clearFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
