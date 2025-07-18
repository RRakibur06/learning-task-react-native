import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

const ACCESS_TOKEN_KEY = '@access_token';
const REFRESH_TOKEN_KEY = '@refresh_token';
const API_DOMAIN = 'https://training-e-commece.vercel.app';

const api = axios.create({
    baseURL: API_DOMAIN + '/api/v1',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

api.interceptors.request.use(
    async (config) => {
        const [accessToken, refreshToken] = await Promise.all([
            AsyncStorage.getItem(ACCESS_TOKEN_KEY),
            AsyncStorage.getItem(REFRESH_TOKEN_KEY)
        ]);

        if (accessToken) {
            await CookieManager.set(API_DOMAIN, {
                name: 'accessToken',
                value: accessToken,
                path: '/',
            });
        }
        if (refreshToken) {
            await CookieManager.set(API_DOMAIN, {
                name: 'refreshToken',
                value: refreshToken,
                path: '/'
            });
        }

        return config;
    },
    (error) => Promise.reject(error)
);


export async function signUp({ name, email, password }) {
    console.log('SignUp called with:', { name, email, password });
    const response = await api.post('/auth/register', { name, email, password });
    console.log('SignUp response:', response.data);
    return response.data;
}

export async function signIn({ email, password }) {
    await CookieManager.clearAll();

    const response = await api.post('/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return response.data;
}

export async function clearAuthTokens() {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}

export default api;