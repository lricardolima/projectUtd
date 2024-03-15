import api from './api';

export async function getClient(id) {
    return await api.get(`/client/${id}`).then(response => response);
}

export async function getClients() {
    return await api.get("/clients").then(response => response);
}

export async function removeClient(id) {
    return await api.delete(`/client/${id}`).then(response => response);
}

export async function addClient(client) {
    return await api.post("/client", client).then(response => response);
}

export async function editClient(client) {
    return await api.put(`/client/${client.id}`, client).then(response => response);
}
