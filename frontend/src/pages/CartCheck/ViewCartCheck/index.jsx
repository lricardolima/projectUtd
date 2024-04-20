// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCartCheckById } from "../../../services/cartCheck-requests.jsx";
import { FaArrowLeft } from 'react-icons/fa';
import '../../../style/view.css';
import moment from "moment";

function ViewCartCheck() {
    const { id } = useParams();
    const [cartCheck, setCartCheck] = useState({
        id: '',
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
        const fetchCartCheck = async () => {
            try {
                const cartCheckData = await getCartCheckById(id);
                setCartCheck(cartCheckData.data);
            } catch (error) {
                console.error('Error fetching CartCheck data:', error);
            }
        };

        fetchCartCheck();
    }, [id]);

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    return (
        <div className="view-cart-check-container">
            <div className="back-button">
                <Link to="/" className="back-link">
                    <FaArrowLeft className="back-icon"/> Voltar para Home
                </Link>
            </div>
            <fieldset className="cart-check-info">
                <legend className="cart-check-info__title">Detalhes do Cart Check</legend>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Id: </span>
                    <span className="cart-check-info__field-value">{cartCheck.id || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Nome: </span>
                    <span className="cart-check-info__field-value">{cartCheck.name || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Estabelecimento: </span>
                    <span className="cart-check-info__field-value">{cartCheck.establishment || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Cartão: </span>
                    <span className="cart-check-info__field-value">{cartCheck.card || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Data Compra: </span>
                    <span className="cart-check-info__field-value">{formatDate(cartCheck.purchaseDate) || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Nº Parcela: </span>
                    <span className="cart-check-info__field-value">{cartCheck.installmentNumber || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Qnt Parcelas: </span>
                    <span className="cart-check-info__field-value">{cartCheck.installmentQuantity || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Valor Parcela: </span>
                    <span className="cart-check-info__field-value">{cartCheck.installmentValue || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Valor Devido: </span>
                    <span className="cart-check-info__field-value">{cartCheck.amountDue || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Total Devido: </span>
                    <span className="cart-check-info__field-value">{cartCheck.totalDue || 'N/A'}</span>
                </div>
                <div className="cart-check-info__field">
                    <span className="cart-check-info__field-label">Dt ùlt. Parcela: </span>
                    <span className="cart-check-info__field-value">{formatDate(cartCheck.lastInstallmentDate) || 'N/A'}</span>
                </div>
            </fieldset>
        </div>
    );
}

export default ViewCartCheck;
