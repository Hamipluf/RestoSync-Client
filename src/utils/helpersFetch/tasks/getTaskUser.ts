import axios from 'axios'
import { responseTaskOfUser } from '../../interfaces';

const getTaskOfUser = async (): Promise<responseTaskOfUser> => {
    const uid: string | null = localStorage.getItem("uid")
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