import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClient } from "../../../services/client-requests.jsx";
import { FaArrowLeft } from 'react-icons/fa';
import '../../../style/style.css';

function ViewClient() {
    const { id } = useParams();
    const [client, setClient] = useState({
        id: '',
        name: '',
        age: '',
        email: ''
    });

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const clientData = await getClient(id);
                setClient(clientData.data);
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchClient();
    }, [id]);

    return (
        <div className="view-client-container">
            <div className="back-button">
                <Link to="/" className="back-link">
                    <FaArrowLeft className="back-icon" /> Voltar para Home
                </Link>
            </div>
            <fieldset className="client-info">
                <legend className="client-info__title">Dados cadastrais</legend>
                {Object.entries(client).map(([key, value]) => (
                    <div key={key} className="client-info__field">
                        <span className="client-info__field-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="client-info__field-value">{value}</span>
                    </div>
                ))}
            </fieldset>
        </div>
    );
}

export default ViewClient;
