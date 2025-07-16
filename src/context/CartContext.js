import React, {
    createContext,
    useState,
    useEffect,
    useContext
} from 'react';
import {
    getCart as apiGetCart,
    addToCart as apiAddToCart,
    updateCartItem as apiUpdateCartItem,
    removeCartItem as apiRemoveCartItem
} from '../api/cartApi';

const CartContext = createContext();

/**
 * Cart shape on the server is:
 * {
 *   _id: string,
 *   user: string,
 *   items: [
 *     { product: { _id, name, price, … }, quantity, _id },
 *     …
 *   ],
 *   createdAt, updatedAt, …
 * }
 */
export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await apiGetCart();
                setCart(data);
            } catch (err) {
                console.error('Failed to load cart', err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const refreshCart = async () => {
        try {
            const data = await apiGetCart();
            setCart(data);
        } catch (err) {
            console.error('Failed to refresh cart', err);
        }
    };

    const handleAdd = async (productId, qty = 1) => {
        try {
            await apiAddToCart(productId, qty);
            await refreshCart();
        } catch (err) {
            console.error('Add to cart failed', err);
            throw err;
        }
    };

    const handleUpdate = async (productId, qty) => {
        try {
            await apiUpdateCartItem(productId, qty);
            await refreshCart();
        } catch (err) {
            console.error('Update cart item failed', err);
            throw err;
        }
    };

    // 6) remove item
    const handleRemove = async (productId) => {
        try {
            await apiRemoveCartItem(productId);
            await refreshCart();
        } catch (err) {
            console.error('Remove from cart failed', err);
            throw err;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,         // always an object with an `items` array
                loading,
                addToCart: handleAdd,
                updateQuantity: handleUpdate,
                removeFromCart: handleRemove
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}