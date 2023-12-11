import axios from 'axios'
import {
    dataUpdateComment, responseUpdateComment

} from '../../interfaces/comments';

const editComment = async (data: dataUpdateComment): Promise<responseUpdateComment> => {
    const cid = data.cid
    const dataComment = {
        body: data.comment,
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/comments/update/${cid}`,
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
export default editComment