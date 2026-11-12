import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const getStoredUser = () => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && typeof storedUser.token === 'string' && storedUser.token) {
            return storedUser;
        }
    } catch {
        // Ignore corrupt browser storage and start with a signed-out session.
    }

    localStorage.removeItem('user');
    return null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser);

    useEffect(() => {
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const headers = error.config?.headers;
                const authorization = typeof headers?.get === 'function'
                    ? headers.get('Authorization')
                    : headers?.Authorization || headers?.authorization;

                if (error.response?.status === 401 && typeof authorization === 'string') {
                    try {
                        const storedUser = JSON.parse(localStorage.getItem('user'));
                        if (storedUser?.token && authorization === `Bearer ${storedUser.token}`) {
                            localStorage.removeItem('user');
                            setUser(null);
                        }
                    } catch {
                        localStorage.removeItem('user');
                        setUser(null);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => axios.interceptors.response.eject(interceptorId);
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
