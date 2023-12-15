import axios from 'axios'
import { dataLogin, responseLogin } from '../../interfaces/user';
export const loginPost = async (data: dataLogin): Promise<responseLogin> => {
    try {
        const response = await axios.post(
            "https://restosync-api.onrender.com/api/users/login",
            data
        );
        if (response.data.data.token) {
            localStorage.setItem("jwt", response.data.data.token);
        }
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};