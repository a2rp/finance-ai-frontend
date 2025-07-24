import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0'];

const ExpensePieChart = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/transactions`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });

                const categoryMap = {};
                res.data.forEach((txn) => {
                    if (txn.type === 'expense') {
                        categoryMap[txn.category] = (categoryMap[txn.category] || 0) + txn.amount;
                    }
                });

                const pieData = Object.keys(categoryMap).map((key) => ({
                    name: key,
                    value: categoryMap[key],
                }));

                setData(pieData);
            } catch (err) {
                console.error('Pie chart error:', err.message);
                if (err.response?.status === 429) {
                    toast.error("🚫 Too many requests. Please wait a moment.");
                } else {
                    toast.error(err.response?.data?.message || "Something went wrong");
                }
            }
        };
        fetch();
    }, []);

    return (
        <Wrapper>
            <h3>Category-wise Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Wrapper>
    );
};

export default ExpensePieChart;

const Wrapper = styled.div`
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
    margin-bottom: 30px;

    transition: 0.2s ease;
    transition-property: box-shadow;
    &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
    }
`;
