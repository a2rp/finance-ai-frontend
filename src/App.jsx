import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import Layout from './layout';
import { ToastContainer, toast } from 'react-toastify';
import PublicRoute from './components/PublicRoute';
import { lazy, Suspense, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import AOS from 'aos'

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const NoPage = lazy(() => import('./pages/NoPage'));

function App() {
    useEffect(() => {
        AOS.init({
            duration: 300,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        })
    }, [])

    return (
        <>
            <AuthProvider>
                <BrowserRouter future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}>
                    <Suspense fallback={<Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}><CircularProgress size={16} /></Box>}>
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <PublicRoute>
                                        <Register />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Layout>
                                            <Dashboard />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Layout>
                                            <Dashboard />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Layout>
                                            <UserProfile />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <Layout>
                                        <NoPage />
                                    </Layout>
                                } />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
