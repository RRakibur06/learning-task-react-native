import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    getCart as apiGetCart,
    addToCart as apiAddToCart,
    updateCartItem as apiUpdateCartItem,
    removeCartItem as apiRemoveCartItem
} from '../api/cartApi';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [mutating, setMutating] = useState(false);

    // load on mount
    useEffect(() => {
        (async () => {
            try {
                const data = await apiGetCart();
                setCart(data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const refreshCart = async () => {
        const data = await apiGetCart();
        setCart(data);
    };

    const addToCart = async (productId, qty) => {
        setMutating(true);
        try {
            await apiAddToCart(productId, qty);
            await refreshCart();
        } finally {
            setMutating(false);
        }
    };

    const updateQuantity = async (cartItemId, qty) => {
        setMutating(true);
        try {
            await apiUpdateCartItem(cartItemId, qty);
            await refreshCart();
        } finally {
            setMutating(false);
        }
    };

    const removeFromCart = async (cartItemId) => {
        setMutating(true);
        try {
            await apiRemoveCartItem(cartItemId);
            await refreshCart();
        } finally {
            setMutating(false);
        }
    };

    const clearCart = () => {
        setCart({ items: [] });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                mutating,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}