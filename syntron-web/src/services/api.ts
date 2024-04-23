
import { TCreateUserRequest, TGetRanksResponse, TRanking } from '@/types/TApi';
import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: '/api',
});

// Define your API methods
export const getUsers = () => {
    return api.get('/users');
};



export const getServers = async () => {
    return await api.get('/servers');
}

export const createUser = (userData: TCreateUserRequest) => {
    return api.post('/users', userData);
};

export const getRanks = async () => {
    return await api.get('/ranks') as TGetRanksResponse
}

// Export the API client
export default api;