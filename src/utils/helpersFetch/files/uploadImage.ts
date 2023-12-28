import axios from 'axios'
import { responseUploadImage  } from '../../interfaces/files';

const uploadImage = async (formData: FormData): Promise<responseUploadImage> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/images/upload/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
export default uploadImage