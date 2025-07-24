import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const AddTransactionForm = ({ onAdd }) => {
    const { user } = useAuth();
    const [form, setForm] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().slice(0, 10),
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (form.amount <= 0) {
            toast.error("Amount must be greater than zero");
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/transactions`, form, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 3000);


            onAdd();
            setForm({ ...form, amount: '', category: '', description: '' });
        } catch (error) {
            console.error('Add transaction error:', err.message);
            if (error.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Wrapper>
                <h3 data-aos="fade-left">Add Transaction</h3>

                <form onSubmit={handleSubmit}>
                    <select name="type" value={form.type} onChange={handleChange} data-aos="fade-left">
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        required
                    />
                    {/* <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        min="0.01"
                        step="0.01"
                        required
                    /> */}

                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Add Transaction'}
                    </button>
                    {success && <p style={{ color: 'green' }}>✅ Saved!</p>}
                </form>

            </Wrapper >
        </>
    );
};

export default AddTransactionForm;

const Wrapper = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.1);
    height: 100%;
    /* margin-bottom: 30px; */

    transition: 0.2s ease;
    transition-property: box-shadow;
    &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
    }

    form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        input, select {
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
        }

        button {
        background: #4CAF50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        }
    }
`;
