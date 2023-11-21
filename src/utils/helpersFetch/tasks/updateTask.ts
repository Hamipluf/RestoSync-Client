import axios from 'axios'
import {
    responseUpdatedTask,
    updateTask
} from '../../interfaces';

const updatedTask = async (data: updateTask): Promise<responseUpdatedTask> => {
    const tid = data.task_id
    const updateData = {
        name: data.name,
        is_completed: data.is_completed
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/tasks/update/${tid}`,
            updateData,
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
export default updatedTask