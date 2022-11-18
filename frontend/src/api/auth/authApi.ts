import { apiManager } from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface LoginInterface {
    (data: {
        email: string,
        password: string,
    }): Promise<any>
}

export const login:LoginInterface = async (data):Promise<any> => {
    try {
        const response = await apiManager.post('/login', {
            email: data.email,
            password: data.password,
        });
        
        if(!response.data.error) {
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
        }
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
        
    }
}


interface SignupInterface {
    (data: {
        fullName: string,
        email: string,
        password: string,
    }): Promise<any>
}

export const signup:SignupInterface = async (data):Promise<any> => {
    try {
        const response = await apiManager.post('/', data);
        if(!response.data.error) {  
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
        }
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};  
    }
}


interface SendEmailInterface {
    (data: {
        email: string,
    }): Promise<any>
}

export const sendEmail:SendEmailInterface = async (data):Promise<any> => {
    try {
        const response = await apiManager.post('/send-password', data);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
    }
}