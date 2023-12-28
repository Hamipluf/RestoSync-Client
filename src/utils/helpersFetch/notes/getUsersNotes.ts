import axios from 'axios'
import { notes } from '../../interfaces/note';

 const getUserNote = async (): Promise<notes> => {
    const uid: string | null = localStorage.getItem("uid")
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/notes/all/user/${uid}`,
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
export default getUserNote