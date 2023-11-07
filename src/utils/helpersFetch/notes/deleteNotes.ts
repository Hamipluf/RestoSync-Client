import axios from 'axios'
import { dataNote, notes } from '../../interfaces';

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