import axios from 'axios'
import { responseGetCommentOfNote } from '../../interfaces';

const getCommentOfNote = async (params: any): Promise<responseGetCommentOfNote> => {
    const nid: string | null = params.queryKey[1]
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/notes/all/comments/${nid}`,
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
export default getCommentOfNote