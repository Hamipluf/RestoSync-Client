import axios from 'axios'
import {
    dataUpdateNote, responseAddNote
} from '../../interfaces/note';

const updateNote = async (data: dataUpdateNote): Promise<responseAddNote> => {
    const nid = data.nid
    const updateData = {
        title: data.title,
        description: data.description,
        is_completed: data.is_completed,
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/notes/update/${nid}`,
            updateData,
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
export default updateNote