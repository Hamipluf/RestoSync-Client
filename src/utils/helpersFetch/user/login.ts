import axios from 'axios'
import { dataLogin } from '../../interfaces';
export const loginPost = async (data: dataLogin): Promise<any> => {
    try {
        const response = await axios.post(
            "https://restosync-api.onrender.com/api/users/login",
            data
        );
        return response.data
    } catch (error) {
        return error;
    }
};