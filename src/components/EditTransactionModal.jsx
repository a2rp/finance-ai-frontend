import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const EditTransactionModal = ({ txn, onClose, onUpdated }) => {
    const { user } = useAuth();
    const [form, setForm] = useState({ ...txn });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (form.amount <= 0) {
            toast.error("Amount must be greater than zero");
            setLoading(false);
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/transactions/${txn._id}`, form, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            onUpdated();
        } catch (err) {
            console.error('Update error:', err.message);
            if (err.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Overlay>
                <ModalBox>
                    <h3>Edit Transaction</h3>
                    <form onSubmit={handleUpdate}>
                        <select name="type" value={form.type} onChange={handleChange}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
                        <input type="text" name="category" value={form.category} onChange={handleChange} required />
                        <input type="text" name="description" value={form.description} onChange={handleChange} />
                        <input type="date" name="date" value={form.date.slice(0, 10)} onChange={handleChange} />
                        <Buttons>
                            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Update'}</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </Buttons>
                    </form>
                </ModalBox>
            </Overlay>
        </>
    );
};

export default EditTransactionModal;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalBox = styled.div`
    background: white;
    padding: 25px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
`;

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;

    button {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    button:first-child {
        background: #4CAF50;
        color: white;
    }

    button:last-child {
        background: #ccc;
    }
`;
