import axios from 'axios'
import { dataRegister } from '../interfaces';
export const registerPost = async (data: dataRegister): Promise<any> => {
    try {
        const response = await axios.post(
            "https://restosync-api.onrender.com/api/users/register",
            data
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};