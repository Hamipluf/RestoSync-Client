import axios from 'axios'
import { responseUpdateUser, user } from '../../interfaces/user';
export const updateUser = async (data: user): Promise<responseUpdateUser> => {
    const uid = data.id;
    const dataUpdate = {
        name: data.name,
        email: data.email,
        last_name: data.last_name,
        username: data.username,
        role: data.role,
        profile_photo: data.profile_photo
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/users/update/${uid}`,
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