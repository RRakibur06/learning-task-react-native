import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    getCart as apiGet,
    addToCart as apiAdd,
    updateCartItem as apiUpdate,
    removeCartItem as apiRemove
} from '../api/cartApi';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [mutating, setMutating] = useState(false);

    useEffect(() => {
        (async () => {
            try { setCart(await apiGet()); }
            finally { setLoading(false); }
        })();
    }, []);

    const refresh = async () => setCart(await apiGet());

    const addToCart = async (p, q) => {
        setMutating(true);
        try { await apiAdd(p, q); await refresh(); }
        finally { setMutating(false); }
    };

    const updateQuantity = async (id, q) => {
        setMutating(true);
        try { await apiUpdate(id, q); await refresh(); }
        finally { setMutating(false); }
    };

    const removeFromCart = async id => {
        setMutating(true);
        try { await apiRemove(id); await refresh(); }
        finally { setMutating(false); }
    };

    return (
        <CartContext.Provider
            value={{ cart, loading, mutating, addToCart, updateQuantity, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}