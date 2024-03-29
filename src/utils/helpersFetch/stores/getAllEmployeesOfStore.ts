import axios from 'axios'
import { allEmployeeStore } from '../../interfaces/employees';

const getAllEmployeesOfStore = async (params: any): Promise<allEmployeeStore> => {
    const sid: number | undefined = params.queryKey[1]
 
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/employees/all/store/${sid}`,
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