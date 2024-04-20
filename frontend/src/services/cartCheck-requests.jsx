import api from './api';

export async function getCartCheckById(id) {
    return await api.get(`/cart-check/${id}`).then(response => response);
}

export async function getAllCartChecks() {
    return await api.get("/cart-checks").then(response => response);
}

export async function deleteCartCheckById(id) {
    return await api.delete(`/cart-check/${id}`).then(response => response);
}

export async function createCartCheck(cartCheck) {
    return await api.post("/cart-check", cartCheck).then(response => response);
}

export async function updateCartCheckById(cartCheck) {
    return await api.put(`/cart-check/${cartCheck.id}`, cartCheck).then(response => response);
}
