import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // ✅ cleaner
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        // Optional: "ngrok-skip-browser-warning": "true"
    }
});

export default api;
