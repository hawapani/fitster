import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance =  axios.create({
    baseURL: 'https://5d01-2401-4900-3e27-11a-58e4-5277-9276-e10.ngrok-free.app' 
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default instance; 