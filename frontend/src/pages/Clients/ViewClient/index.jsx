import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClients, removeClient } from "../../../services/client-requests.jsx";
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../../../style/table.css'
import '../../../style/style.css'

function ViewClient() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const clientsResponse = await getClients();
            setClients(clientsResponse.data);
        } catch (error) {
            console.error('Error loading clients:', error);
        }
    }

    const deleteClient = async (id) => {
        try {
            await removeClient(id);
            // Remove client from the list after successful deletion
            setClients(clients.filter(client => client.id !== id));
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    }

    return (
        <>
            <h1 className="title">Lista de Clientes</h1>

            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td data-label="id">{client.id}</td>
                        <td data-label="name">{client.name}</td>
                        <td data-label="age">{client.age}</td>
                        <td data-label="email">{client.email}</td>
                        <td>
                            <Link to={`../edit/${encodeURIComponent(client.id)}`}>
                                <button><FaEdit /></button>
                            </Link>
                            <button onClick={() => deleteClient(client.id)}><FaTrash /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default ViewClient;
