import axios from 'axios'
import { responseTaskOfUser } from '../../interfaces/tasks';

const getTaskOfUser = async (params: any): Promise<responseTaskOfUser> => {
    const uid: number = params.queryKey[1]
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/tasks/all/user/${uid}`,
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
export default getTaskOfUser