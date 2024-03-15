import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addClient } from '../../../services/client-requests.jsx';
import '../../../style/style.css'
import '../../../style/form.css'

function AddClient() {
    const navigate = useNavigate();
    const [client, setClient] = useState({
        name: '',
        age: '',
        email: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setClient((prevClient) => {
            return {
                ...prevClient,
                [name]: value
            };
        });
    };

    const saveClient = async (event) => {
        event.preventDefault();
        await addClient(client);
        navigate('/client/view');
    };

    return (
        <div className="form-container">
            <h1 className="title">Cadastrar Cliente</h1>
            <form onSubmit={saveClient}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        placeholder="Digite seu nome"
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
                        placeholder="Digite sua idade"
                        value={client.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        placeholder="Digite seu email"
                        value={client.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="submit" type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default AddClient;
