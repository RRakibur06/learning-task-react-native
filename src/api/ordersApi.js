// src/api/ordersApi.js
import api from './api'

/**
 * Create a new order
 * POST /orders
 * body: { shippingAddress, paymentMethod }
 */
export async function placeOrder({ shippingAddress, paymentMethod }) {
    const res = await api.post('/orders', { shippingAddress, paymentMethod })
    return res.data
}

/**
 * Fetch the current user’s past orders
 * GET /orders/history
 * @returns {Promise<Array>} Array of order objects
 */
export async function getOrderHistory() {
    const res = await api.get('/orders/history');
    // res.data.data is the array of orders
    return res.data.data;
}
