import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCartCheck } from '../../../services/cartCheck-requests';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import moment from "moment";
import '../../../style/form.css';

function AddCartCheck() {
    const navigate = useNavigate();
    const [cartCheck, setCartCheck] = useState({
        name: 'test',
        establishment: 'test',
        card: 'test',
        purchaseDate: '',
        installmentNumber: 1,
        installmentQuantity: 1,
        installmentValue: 0,
        amountDue: 0,
        totalDue: 0,
        lastInstallmentDate: ''
    });
    useEffect(() => {
        const calculateNextInstallmentNumber = () => {
            const { purchaseDate, installmentQuantity } = cartCheck;
            if (purchaseDate && installmentQuantity) {
                let nextInstallmentNumber = Math.floor(moment().diff(purchaseDate, 'days') / 30) + 1;
                nextInstallmentNumber = Math.min(nextInstallmentNumber, installmentQuantity); // Ensure nextInstallmentNumber doesn't exceed installmentQuantity
                setCartCheck(prevCartCheck => ({
                    ...prevCartCheck,
                    installmentNumber: nextInstallmentNumber
                }));
            }
        };

        calculateNextInstallmentNumber(); // Calculate nextInstallmentNumber initially
    }, [cartCheck.purchaseDate, cartCheck.installmentQuantity]);

    useEffect(() => {
        const calculateAmountDue = () => {
            const { installmentNumber, installmentValue, totalDue } = cartCheck;
            const amountDue = (installmentNumber * installmentValue) - totalDue;
            setCartCheck(prevCartCheck => ({
                ...prevCartCheck,
                amountDue: amountDue.toFixed(2) // Round to two decimal places
            }));
        };

        calculateAmountDue(); // Calculate amountDue initially
    }, [cartCheck.installmentNumber, cartCheck.installmentValue, cartCheck.totalDue]);

    useEffect(() => {
        const calculateTotalDue = () => {
            const { installmentQuantity, installmentValue } = cartCheck;
            const totalDue = installmentQuantity * installmentValue;
            setCartCheck(prevCartCheck => ({
                ...prevCartCheck,
                totalDue: totalDue.toFixed(2) // Round to two decimal places
            }));
        };

        calculateTotalDue(); // Calculate totalDue initially
    }, [cartCheck.installmentQuantity, cartCheck.installmentValue]);

    useEffect(() => {
        const calculateLastInstallmentDate = () => {
            const { purchaseDate, installmentQuantity } = cartCheck;
            if (purchaseDate && installmentQuantity) {
                const lastInstallmentDate = moment(purchaseDate).add(parseInt(installmentQuantity), 'months').format('YYYY-MM-DD');
                setCartCheck(prevCartCheck => ({
                    ...prevCartCheck,
                    lastInstallmentDate: lastInstallmentDate
                }));
            }
        };

        calculateLastInstallmentDate(); // Calculate lastInstallmentDate initially
    }, [cartCheck.purchaseDate, cartCheck.installmentQuantity]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCartCheck(prevCartCheck => ({
            ...prevCartCheck,
            [name]: value
        }));
    };

    const handleClick = (event) => {
        event.target.select(); // Selecionar automaticamente o conteúdo do campo
    };

    const saveCartCheck = async (event) => {
        event.preventDefault();
        await createCartCheck(cartCheck);
        navigate('/');
    };

    return (
        <div className="form-container">
            <form onSubmit={saveCartCheck}>
                <fieldset>
                    <legend>Cadastrar Cart Check</legend>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            value={cartCheck.name}
                            onChange={handleChange}
                            onClick={handleClick}
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
                            onClick={handleClick}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="card">Cartão</label>
                        <select
                            id="card"
                            name='card'
                            value={cartCheck.card}
                            onChange={handleChange}
                            onClick={handleClick}
                        >
                            <option value="">Selecione um cartão</option>
                            <option value="MELIUZ">MELIUZ</option>
                            <option value="PAN">PAN</option>
                            <option value="CAIXA">CAIXA</option>
                            <option value="NUBANK">NUBANK</option>
                            <option value="INTER">INTER</option>
                            <option value="OUTROS">OUTROS</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchaseDate">Data Compra</label>
                        <input
                            type="date"
                            id="purchaseDate"
                            name='purchaseDate'
                            value={cartCheck.purchaseDate}
                            onChange={handleChange}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="installmentNumber">Número Parcela</label>
                        <input
                            type="number"
                            id="installmentNumber"
                            name='installmentNumber'
                            value={cartCheck.installmentNumber}
                            onChange={handleChange}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="installmentQuantity">Quant. Parcelas</label>
                        <input
                            type="number"
                            id="installmentQuantity"
                            name='installmentQuantity'
                            value={cartCheck.installmentQuantity}
                            onChange={handleChange}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="installmentValue">Valor Parcela</label>
                        <input
                            type="number"
                            id="installmentValue"
                            name='installmentValue'
                            value={cartCheck.installmentValue}
                            onChange={handleChange}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amountDue">Valor Devido</label>
                        <input
                            type="number"
                            id="amountDue"
                            name='amountDue'
                            value={cartCheck.amountDue}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="totalDue">Total Devido</label>
                        <input
                            type="number"
                            id="totalDue"
                            name='totalDue'
                            value={cartCheck.totalDue}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastInstallmentDate">Dt. Últ. Parcela</label>
                        <input
                            type="date"
                            id="lastInstallmentDate"
                            name='lastInstallmentDate'
                            value={cartCheck.lastInstallmentDate}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <button className="submit" type="submit">
                            <FaUserPlus/> Cadastrar
                        </button>
                    </div>
                    <div className="form-group">
                        <button className="action-button" onClick={() => navigate('/')}>
                            <FaArrowLeft/> Cancelar
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default AddCartCheck;
