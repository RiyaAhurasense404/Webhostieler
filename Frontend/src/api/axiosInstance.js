import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://booking-search.p.rapidapi.com',
    headers:{
        "x-rapidapi-host": import.meta.env.VITE_RAPID_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPID_KEY
    }
})
export default axiosInstance