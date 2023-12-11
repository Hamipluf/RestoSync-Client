import axios from 'axios'
import { notes } from '../../interfaces/note';

const deleteNote = async (nit: number): Promise<notes> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.delete(
            `https://restosync-api.onrender.com/api/notes/delete/${nit}`,
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
export default deleteNote