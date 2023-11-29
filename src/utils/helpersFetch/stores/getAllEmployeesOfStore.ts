import axios from 'axios'
import { allEmployeeStore } from '../../interfaces';

const getAllEmployeesOfStore = async (params: any): Promise<allEmployeeStore> => {
    const sid: number | undefined = params.queryKey[1]
 
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/stores/employees/${sid}`,
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
export default getAllEmployeesOfStore