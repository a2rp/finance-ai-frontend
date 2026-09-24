import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./components/PublicRoute";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const NoPage = lazy(() => import("./pages/NoPage"));

const loadingFallback = (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}
    >
        <CircularProgress size={28} />
    </Box>
);

function AppRoutes() {
    const location = useLocation();

    return (
        <Suspense key={location.pathname} fallback={loadingFallback}>
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
                    }
                />
            </Routes>
        </Suspense>
    );
}

function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <AppRoutes />
                </BrowserRouter>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
