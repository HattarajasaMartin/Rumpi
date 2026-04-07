import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

export const loginAPI = async (userData: any) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const registerAPI = async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};