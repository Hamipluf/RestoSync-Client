import axios from 'axios'
import {
    responseCreateStore,
    updateStore,
} from '../../interfaces';

const updateStore = async (data: updateStore): Promise<responseCreateStore> => {
    const sid = data.sid
    const dataUpdate = {
        name: data.name,
        address: data.address,
        company_name: data.company_name,
        cuit: data.cuit,
        owner_id: data.owner_id
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/stores/update/${sid}`,
            dataUpdate,
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
export default updateStore