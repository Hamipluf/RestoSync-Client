import axios from 'axios'
import { dataAddEmployee, responseAssignEmploye } from '../../interfaces';

const addEmployeesToStore = async (data: dataAddEmployee): Promise<responseAssignEmploye> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/employees/create`,
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
export default addEmployeesToStore