import { createContext, useContext, useState } from 'react';

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
