import axios from 'axios';

const api = axios.create({
    baseURL: 'https://movie-api-backend-55x5.onrender.com/api/v1/movies', // ✅ cleaner
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        // Optional: "ngrok-skip-browser-warning": "true"
    }
});

export default api;
