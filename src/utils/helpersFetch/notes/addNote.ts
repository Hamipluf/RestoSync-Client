import axios from 'axios'
import {
    dataAddNote
    , responseAddNote
} from '../../interfaces/note';

const addNote = async (data: dataAddNote): Promise<responseAddNote> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/notes/add/task`,
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