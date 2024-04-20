import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {updateCartCheckById, getCartCheckById} from '../../../services/cartCheck-requests.jsx';
import {FaArrowLeft, FaSave} from "react-icons/fa";


function EditCartCheck() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [cartCheck, setCartCheck] = useState({
        name: '',
        establishment: '',
        card: '',
        purchaseDate: '',
        installmentNumber: '',
        installmentQuantity: '',
        installmentValue: '',
        amountDue: '',
        totalDue: '',
        lastInstallmentDate: ''
    });

    useEffect(() => {
        fetchCartCheck(id);
    }, []);

    const fetchCartCheck = async (id) => {
        const cartCheckData = await (await getCartCheckById(id)).data;
        setCartCheck(cartCheckData);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCartCheck((prevCartCheck) => {
            return {
                ...prevCartCheck,
                [name]: value
            };
        });
    };

    const updateCartCheck = async (event) => {
        event.preventDefault();
        await updateCartCheckById(cartCheck);
        navigate('/');
    };

    return (
        <div className="form-container">

            <h1 className="title">Editar Cart Check</h1>
            <form onSubmit={updateCartCheck}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={cartCheck.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="establishment">Estabelecimento</label>
                    <input
                        type="text"
                        id="establishment"
                        name='establishment'
                        value={cartCheck.establishment}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="card">Cartão</label>
                    <input
                        type="text"
                        id="card"
                        name='card'
                        value={cartCheck.card}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="purchaseDate">Data Compra</label>
                    <input
                        type="text"
                        id="purchaseDate"
                        name='purchaseDate'
                        value={cartCheck.purchaseDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="installmentNumber">Número Parcela</label>
                    <input
                        type="text"
                        id="installmentNumber"
                        name='installmentNumber'
                        value={cartCheck.installmentNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="installmentQuantity">Quant. Parcelas</label>
                    <input
                        type="text"
                        id="installmentQuantity"
                        name='installmentQuantity'
                        value={cartCheck.installmentQuantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="installmentValue">Valor Parcela</label>
                    <input
                        type="text"
                        id="installmentValue"
                        name='installmentValue'
                        value={cartCheck.installmentValue}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amountDue">Valor Devido</label>
                    <input
                        type="text"
                        id="amountDue"
                        name='amountDue'
                        value={cartCheck.amountDue}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="totalDue">Total Devido</label>
                    <input
                        type="text"
                        id="totalDue"
                        name='totalDue'
                        value={cartCheck.totalDue}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastInstallmentDate">Dt Últ. Parcela</label>
                    <input
                        type="text"
                        id="lastInstallmentDate"
                        name='lastInstallmentDate'
                        value={cartCheck.lastInstallmentDate}
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

export default EditCartCheck;
