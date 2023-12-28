import axios from 'axios'
import { responseGetImage } from '../../interfaces/files';

const getImage = async (params: any): Promise<responseGetImage> => {
    const profile_key: number = params.queryKey[1]
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/images/get-one/${profile_key}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
export default getImage