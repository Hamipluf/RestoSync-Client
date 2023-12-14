import axios from 'axios'
import { dataStore, responseCreateStore } from '../../interfaces/store';

const createStore = async (data: dataStore): Promise<responseCreateStore> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/stores/create`,
            data,
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
export default createStore