import React, { useEffect, useState } from 'react';
import { getAllCartChecks, deleteCartCheckById } from "../../../services/cartCheck-requests.jsx";
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import Navbar from '../../Navbar/index.jsx';
import '../../../style/table.css';
import moment from "moment";

function HomeCartCheck() {
    const [cartChecks, setCartChecks] = useState([]);

    useEffect(() => {
        loadCartChecks();
    }, []);

    const loadCartChecks = async () => {
        try {
            const cartChecksResponse = await getAllCartChecks();
            setCartChecks(cartChecksResponse.data);
        } catch (error) {
            console.error('Error loading Cart Check:', error);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''; // Handle empty or invalid dateString
        return moment(dateString).format('DD/MM/YYYY');
    };

    const deleteCartCheck = async (id) => {
        try {
            await deleteCartCheckById(id);
            // Remove Cart Check from the list after successful deletion
            setCartChecks(cartChecks.filter(cartCheck => cartCheck.id !== id));
        } catch (error) {
            console.error('Error deleting Cart Check:', error);
        }
    }

    return (
        <>
            <Navbar />
            <h1 className="title">Lista de Cart Check</h1>

            <table className="cart-check-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Estabelecimento</th>
                    <th>Cartão</th>
                    <th>Data Compra</th>
                    <th>Nº Parcela</th>
                    <th>Qnt Parcelas</th>
                    <th>Valor Parcela</th>
                    <th>Valor Devido</th>
                    <th>Total Devido</th>
                    <th>Dt Últ. Parcela</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {cartChecks.map(cartCheck => (
                    <tr key={cartCheck.id}>
                        <td>{cartCheck.name}</td>
                        <td>{cartCheck.establishment}</td>
                        <td>{cartCheck.card}</td>
                        <td>{formatDate(cartCheck.purchaseDate)}</td>
                        <td>{cartCheck.installmentNumber}</td>
                        <td>{cartCheck.installmentQuantity}</td>
                        <td>{cartCheck.installmentValue} R$</td>
                        <td>{cartCheck.amountDue} R$</td>
                        <td>{cartCheck.totalDue} R$</td>
                        <td>{formatDate(cartCheck.lastInstallmentDate)}</td>
                        <td>
                            <div className="action-buttons">
                                <button className="action-button edit" onClick={() => {
                                    window.location.href = `../cart-check/edit/${encodeURIComponent(cartCheck.id)}`;
                                }}>
                                    <FaEdit size={15} className="icon"/>
                                </button>
                                <button className="action-button delete" onClick={() => deleteCartCheck(cartCheck.id)}>
                                    <FaTrash size={15} className="icon"/>
                                </button>
                                <button className="action-button view" onClick={() => {
                                    window.location.href = `/cart-check/view/${encodeURIComponent(cartCheck.id)}`;
                                }}>
                                    <FaInfoCircle size={15} className="icon" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default HomeCartCheck;
