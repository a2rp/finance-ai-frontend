const API_BASE_URL =
    import.meta.env.VITE_BACKEND_URL ||
    (window.location.hostname === "localhost"
        ? "http://localhost:1198/api"
        : "https://finance-ai-backend-7fx5.onrender.com/api");

export default API_BASE_URL;
