
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

export const getHistory = async () => {
    return await api.get(`/history`);
}

export const getUserHistory = async (name:string) => {
    return await api.get(`/history?name=${name}`);
}

export const getUserOverview = async (name:string) => {
    return await api.get(`/overview?name=${name}`);
}

// Export the API client
export default api;