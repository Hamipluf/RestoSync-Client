import axios from 'axios'
import { responseStoresOwner } from '../../interfaces/store';

const getStoreOfUser = async (params: any): Promise<responseStoresOwner> => {
    const uid: number = params.queryKey[1]
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/stores/owner/${uid}`,
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
export default getStoreOfUser