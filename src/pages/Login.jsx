import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import API_BASE_URL from '../api';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/users/login`, form);
            login(res.data);
            navigate('/');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed');
            if (err.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Styled.Wrapper>
                <div className="main">
                    <h1 className='heading' data-aos="zoom-in">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            data-aos="fade-left"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            data-aos="fade-right"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            data-aos="fade-up"
                        >
                            {isLoading ? <>
                                <CircularProgress size={16} style={{ color: '#fff' }} />
                            </> : 'Login'}
                        </button>
                    </form>
                    <div className="createAccount">
                        <p
                            data-aos="fade-right"
                        >Don't have an account? <NavLink to="/register">Register</NavLink></p>
                    </div>
                </div>
            </Styled.Wrapper>
        </>
    );
};

export default Login;

const Styled = {
    Wrapper: styled.div`
        /* border: 1px solid #f00; */
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: box-shadow 0.2s ease;

        .main {
            border: 1px solid #ccc;
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.2s ease;
            overflow: hidden;

            &:hover {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .heading {
                margin-bottom: 20px;
                text-align: center;
                font-size: 24px;
            }
    
            form {
                display: flex;
                flex-direction: column;
                gap: 15px;
    
                input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .forgetPasswordLink {
                    /* border: 1px solid #007bff; */
                    height: 30px;
                    text-align: center;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    color: #007bff; 
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
    
                button {
                    display: block;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    overflow: hidden;
                    height: 40px;
    
                    &:hover {
                        background: #0056b3;
                    }
                }
            }

            .createAccount {
                text-align: center;
                margin-top: 15px;

                p {
                    margin: 0;
                    font-size: 14px;

                    a {
                        color: #007bff;
                        text-decoration: none;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

    `,
};
