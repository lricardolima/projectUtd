import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClients, removeClient } from "../../../services/client-requests.jsx";
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import Navbar from '../../Navbar/index.jsx';
import '../../../style/table.css'
import '../../../style/style.css'

function HomeClient() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

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

    const selectClient = (client) => {
        setSelectedClient(client);
    }

    return (
        <>
            <Navbar />
            <h1 className="title">Lista de Clientes</h1>

            <table className="client-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.age}</td>
                        <td>{client.email}</td>
                        <td>
                            <div className="action-buttons">
                                <Link to={`../client/edit/${encodeURIComponent(client.id)}`}>
                                    <button className="action-button edit"><FaEdit /></button>
                                </Link>
                                <button className="action-button delete" onClick={() => deleteClient(client.id)}><FaTrash /></button>
                                <Link to={`/client/view/${encodeURIComponent(client.id)}`}>
                                    <button className="action-button view" onClick={() => selectClient(client)}>
                                        <FaInfoCircle />
                                    </button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default HomeClient;
