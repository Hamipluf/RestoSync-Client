import axios from 'axios'
import { responseDeleteTask } from '../../interfaces/tasks';

const deleteTask = async (tid: number): Promise<responseDeleteTask> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.delete(
            `https://restosync-api.onrender.com/api/tasks/delete/${tid}`,
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
export default deleteTask