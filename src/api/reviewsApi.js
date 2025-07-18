// src/api/reviewsApi.js
import api from './api';

/**
 * Fetch all reviews for a given product
 * GET /reviews/product/:productId
 */
export async function getProductReviews(productId) {
    const res = await api.get(`/reviews/product/${productId}`);
    return res.data.data;  // array of reviews
}

/**
 * Add a new review
 * POST /reviews
 * body: { productId, comment }
 */
export async function addReview({ productId, comment }) {
    const res = await api.post('/reviews', { productId, comment });
    return res.data.data;  // the created review object
}