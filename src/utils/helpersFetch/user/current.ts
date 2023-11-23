import axios from 'axios'
import { responseCurrent } from '../../interfaces';
export const getCurrent = async (): Promise<responseCurrent> => {
    const token = localStorage.getItem('jwt')
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