import axios from 'axios'
import { dataLogin, responseLogin } from '../../interfaces/user';
export const loginPost = async (data: dataLogin): Promise<responseLogin> => {
    try {
        const response = await axios.post(
            "https://restosync-api.onrender.com/api/users/login",
            data
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};