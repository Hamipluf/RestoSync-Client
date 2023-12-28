import axios from 'axios'
import {
    createTask,
    responseTaskOfUser
} from '../../interfaces/tasks';

const createTask = async (data: createTask): Promise<responseTaskOfUser> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/tasks/create`,
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
export default createTask