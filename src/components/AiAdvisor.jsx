import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const AiAdvisor = () => {
    const { user } = useAuth();
    const [advice, setAdvice] = useState('');
    const [disclaimer, setDisclaimer] = useState('');
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
            setDisclaimer(res.data.disclaimer || '');
        } catch (err) {
            setAdvice('Could not load budgeting tips. Please try again.');
            setDisclaimer('');
            if (err.response?.status === 429) {
                toast.error('Too many requests. Please wait a moment.');
            } else {
                toast.error(err.response?.data?.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <fieldset>
                <legend>Smart Financial Tips</legend>
                <button type="button" onClick={handleAsk} disabled={loading} className="adviceButton">
                    {loading ? 'Preparing tips...' : 'Get budgeting tips'}
                </button>
                {advice && (
                    <AdviceBox>
                        <p>{advice}</p>
                        {disclaimer && <small>{disclaimer}</small>}
                    </AdviceBox>
                )}
            </fieldset>
        </Wrapper>
    );
};

export default AiAdvisor;

const Wrapper = styled.div`
    background: #fff;
    padding: 20px;
    margin: 30px 0;
    border-radius: 12px;

    transition: box-shadow 0.2s ease;
    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    }

    fieldset {
        padding: 15px;

        legend {
            padding: 0 15px;
        }
    }

    .adviceButton {
        cursor: pointer;
        color: #007bff;
        font: inherit;
        background: none;
        border: 0;
        padding: 0;
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }

        &:disabled {
            cursor: wait;
            opacity: 0.7;
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

    p {
        margin: 0;
    }

    small {
        display: block;
        margin-top: 12px;
        font-style: normal;
    }
`;
