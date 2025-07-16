import api from "./api"

/**
 * Fetch the current user’s cart
 * GET /cart
 * @returns {Promise<Object>} Cart data object
 */
export async function getCart() {
    console.log('Fetching cart data...')
    const response = await api.get('/cart')
    console.log('cart data', response.data.data)
    return response.data.data
}

/**
 * Add a product to the cart (or increment its quantity)
 * POST /cart
 * body: { productId, quantity }
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Object>} Updated cart object
 */
export async function addToCart(productId, quantity = 1) {
    const response = await api.post('/cart', { productId, quantity })
    console.log('Add to cart response:', response.data)
    return response.data.data
}

/**
 * Update the quantity of a single cart item
 * PATCH /cart/:productId
 * body: { quantity }
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Object>} Updated cart object
 */
export async function updateCartItem(productId, quantity) {
    const response = await api.patch(`/cart/${productId}`, { quantity })
    console.log('Update cart item response:', response.data)
    return response.data.data
}

/**
 * Remove a single product from the cart
 * DELETE /cart/:productId
 * @param {string} productId
 * @returns {Promise<Object>} Updated cart object
 */
export async function removeCartItem(productId) {
    const response = await api.delete(`/cart/${productId}`)
    console.log('Remove cart item response:', response.data)
    return response.data.data
}



