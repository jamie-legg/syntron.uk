import { TCreateUserRequest } from '@/types/TApi';
import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
});

// Define your API methods
export const getUsers = () => {
    return api.get('/users');
};

export const createUser = (userData: TCreateUserRequest) => {
    return api.post('/users', userData);
};

// Export the API client
export default api;