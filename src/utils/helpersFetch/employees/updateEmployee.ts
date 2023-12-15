import axios from 'axios'
import { dataUpdateEmployee, responseAssignEmploye } from '../../interfaces';

const updateEmployee = async (data: dataUpdateEmployee): Promise<responseAssignEmploye> => {
    const dataUpdate = {
        name: data.name,
        role: data.role,
        disponibility: data.disponibility
    }
    const { eid } = data
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/employees/update/${eid}`,
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
export default updateEmployee