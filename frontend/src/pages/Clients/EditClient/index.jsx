import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {editClient, getClient} from '../../../services/client-requests.jsx';
import {FaArrowLeft, FaSave, FaUserPlus} from "react-icons/fa";

function EditClient() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({
        name: '',
        age: '',
        email: ''
    });

    useEffect(() => {
        fetchClient(id);
    }, []);

    const fetchClient = async (id) => {
        const clientData = await (await getClient(id)).data;
        setClient(clientData);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setClient((prevClient) => {
            return {
                ...prevClient,
                [name]: value
            };
        });
    };

    const updateClient = async (event) => {
        event.preventDefault();
        await editClient(client);
        navigate('/');
    };

    return (
        <div className="form-container">

            <h1 className="title">Editar Cliente</h1>
            <form onSubmit={updateClient}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={client.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Idade</label>
                    <input
                        type="text"
                        id="age"
                        name='age'
                        value={client.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={client.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="submit" type="submit">
                        <FaSave/> Cadastrar
                    </button>
                </div>
                <div className="form-group">
                    <button className="action-button" onClick={() => navigate('/')}>
                        <FaArrowLeft/> Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditClient;
