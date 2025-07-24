import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import styled from 'styled-components';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const IncomeExpenseChart = () => {
    const { user } = useAuth();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/transactions`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const dataByMonth = {};

                res.data.forEach((txn) => {
                    const month = format(new Date(txn.date), 'yyyy-MM');
                    if (!dataByMonth[month]) {
                        dataByMonth[month] = { month, income: 0, expense: 0 };
                    }
                    if (txn.type === 'income') {
                        dataByMonth[month].income += txn.amount;
                    } else {
                        dataByMonth[month].expense += txn.amount;
                    }
                });

                const sortedData = Object.values(dataByMonth).sort((a, b) => a.month.localeCompare(b.month));
                setChartData(sortedData);
            } catch (err) {
                console.error('Chart fetch failed:', err);
                if (err.response?.status === 429) {
                    toast.error("🚫 Too many requests. Please wait a moment.");
                } else {
                    toast.error(err.response?.data?.message || "Something went wrong");
                }
            }
        };
        fetchTransactions();
    }, []);

    return (
        <>
            <Wrapper>
                <h3>Monthly Income vs Expense</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#4CAF50" />
                        <Bar dataKey="expense" fill="#F44336" />
                    </BarChart>
                </ResponsiveContainer>
            </Wrapper>
        </>
    );
};

export default IncomeExpenseChart;

const Wrapper = styled.div`
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);

    transition: 0.2s ease;
    transition-property: box-shadow;
    &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
    }
`;
