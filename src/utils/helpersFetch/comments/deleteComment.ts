import axios from 'axios'
import { responseDeleteComment } from '../../interfaces/comments';

const deleteComment = async (cid: number): Promise<responseDeleteComment> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.delete(
            `https://restosync-api.onrender.com/api/comments/delete/${cid}`,
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
export default deleteComment