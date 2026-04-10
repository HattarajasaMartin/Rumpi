import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

// 1. LOGIN MANUAL (EMAIL & PASSWORD)
export const loginAPI = async (userData: any) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

// 2. REGISTER MANUAL
export const registerAPI = async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// 3. GOOGLE LOGIN (MENUKAR TOKEN GOOGLE DENGAN JWT TALKA)
export const googleLoginAPI = async (googleToken: string) => {
    const response = await axios.post(`${API_URL}/google-login`, {  // pergi ke endpoint/alamaat Google
        token: googleToken // Properti 'token' ini harus sama dengan yang diminta di Backend controller
    });
    return response.data;
};