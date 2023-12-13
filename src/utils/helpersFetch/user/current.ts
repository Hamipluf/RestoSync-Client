import axios from 'axios'
import { responseCurrent } from '../../interfaces/user';
export const getCurrent = async (): Promise<responseCurrent> => {
    const token = localStorage.getItem('jwt')
    if (!token) {
        return {
            success: false,
            code: 400,
            message: "Falta token.",
            data: "Falta token."
        }
    }
    try {
        const response = await axios.get(
            "https://restosync-api.onrender.com/api/users/current",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};