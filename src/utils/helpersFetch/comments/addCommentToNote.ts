import axios from 'axios'
import {
    dataAddComment, responseAddComment

} from '../../interfaces/comments';

const addCommentToNote = async (data: dataAddComment): Promise<responseAddComment> => {
    const nid = data.nid
    const dataComment = {
        user_id: data.user_id,
        comment: data.comment,
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/notes/add/comment/${nid}`,
            dataComment,
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
export default addCommentToNote