import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const SummaryCards = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        netSavings: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/transactions/summary`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setSummary(res.data);
            } catch (err) {
                console.error('Summary fetch failed:', err);
                if (err.response?.status === 429) {
                    toast.error("🚫 Too many requests. Please wait a moment.");
                } else {
                    toast.error(err.response?.data?.message || "Something went wrong");
                }
            }
        };
        fetchSummary();
    }, []);

    return (
        <Wrapper>
            <Card>
                <h3>Total Income</h3>
                <p>₹ {summary.totalIncome.toLocaleString()}</p>
            </Card>
            <Card>
                <h3>Total Expense</h3>
                <p>₹ {summary.totalExpense.toLocaleString()}</p>
            </Card>
            <Card>
                <h3>Net Savings</h3>
                <p>₹ {summary.netSavings.toLocaleString()}</p>
            </Card>
        </Wrapper>
    );
};

export default SummaryCards;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* margin-bottom: 30px; */
    @media (max-width: 768px) {
        /* flex-direction: column; */
    }
`;

const Card = styled.div`
    flex: 1;
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
    transition: 0.2s ease;
    transition-property: box-shadow;
    &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
    }

    h3 {
        margin-bottom: 10px;
        color: #444;
    }

    p {
        font-size: 24px;
        font-weight: bold;
        color: #222;
    }
`;
