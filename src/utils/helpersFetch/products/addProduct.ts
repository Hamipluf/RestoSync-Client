import axios from 'axios'
import {
    dataAddNote
    , responseAddNote
} from '../../interfaces';

const addNote = async (data: dataAddNote): Promise<> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/products/create`,
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
export default addNote