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
        return error;
        
    }
}
