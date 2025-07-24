import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const AiAdvisor = () => {
    const { user } = useAuth();
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${API_BASE_URL}/ai-advice`,
                {},
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            setAdvice(res.data.advice);
        } catch (err) {
            setAdvice('❌ Error fetching advice.');
            console.error('AI error:', err.message);
            if (err.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Wrapper>
                <fieldset>
                    <legend>Smart AI Tips</legend>
                    <h3 onClick={handleAsk} disabled={loading} className='adviceButton'>
                        {loading ? 'Analyzing...' : 'Click here to get saving & investment advice'}
                    </h3>
                    {advice && <AdviceBox>{advice}</AdviceBox>}
                </fieldset>
            </Wrapper>
        </>
    );
};

export default AiAdvisor;

const Wrapper = styled.div`
    background: #fff;
    padding: 20px;
    margin: 30px 0;
    border-radius: 12px;

    transition: 0.2s ease;
    transition-property: box-shadow;
    &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
    }

    fieldset {
        padding: 15px;

        legend {
            /* margin-left: 15px; */
            padding: 0 15px;
        }
    }

    .adviceButton {
        /* border: 1px solid #000; */
        cursor: pointer;
        color: #007bff;
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
`;

const AdviceBox = styled.div`
    margin-top: 15px;
    font-style: italic;
    line-height: 1.6;
    background: #fffbe0;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #f7e68c;
`;
