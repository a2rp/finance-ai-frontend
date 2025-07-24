// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api';

const Wrapper = styled.div`
    max-width: 500px;
    margin: 40px auto;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 0 10px #00000010;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Button = styled.button`
    background: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.put(
                `${API_BASE_URL}/users/profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            console.log('Profile updated:', res.data);

            setUser({ ...user, ...res.data });
            localStorage.setItem('user', JSON.stringify({ ...user, ...res.data }));

            toast('Profile updated successfully');
        } catch (err) {
            // console.error(err);
            toast.error(err?.response?.data?.message || 'Update failed');
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
        <Wrapper>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                />
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                />
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password (leave blank to keep same)"
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                >

                    {isLoading ? <>Updating...</> : <>Update Profile</>}
                </Button>
            </form>
        </Wrapper>
    );
};

export default UserProfile;
