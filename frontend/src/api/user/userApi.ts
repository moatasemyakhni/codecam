import { apiManager } from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";


const usersBaseUrl = '/users';
const config = {
    headers: {
        Authorization: '',
    },
};
const getToken = async () => await AsyncStorage.getItem('token');

export const getUserInfo = async () => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.get(`${usersBaseUrl}/`, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data: {...error, error: true};
    }
}


