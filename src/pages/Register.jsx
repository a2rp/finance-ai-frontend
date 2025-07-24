import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/users/register`, form);
            login(res.data);
            navigate('/');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Registration failed');
            if (err.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        }
    };

    return (
        <>
            <Styled.Wrapper>
                <div className="main">
                    <h1
                        className='heading'
                        data-aos="zoom-in"
                    >Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            required
                            data-aos="fade-left"
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            data-aos="fade-right"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            data-aos="fade-left"
                        />
                        <button
                            type="submit"
                            data-aos="zoom-in"
                        >Register</button>
                    </form>
                    <div className="alreadyHaveAnAccount">
                        <p
                            data-aos="fade-right"
                        >
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </Styled.Wrapper>
        </>
    );
};

export default Register;


const Styled = {
    Wrapper: styled.div`
        /* border: 1px solid #f00; */
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .main {
            border: 1px solid #ccc;
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;

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
    
                button {
                    height: 40px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
    
                    &:hover {
                        background: #0056b3;
                    }
                }
            }

              .alreadyHaveAnAccount {
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
