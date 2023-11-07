import axios from 'axios'
import { dataNote, notes } from '../../interfaces';

const addNote = async (data: dataNote): Promise<notes> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/notes/create`,
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