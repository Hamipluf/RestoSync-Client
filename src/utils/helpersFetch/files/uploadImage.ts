import axios from 'axios'
import { responseUploadImage, dataUploadImage } from '../../interfaces/files';

const uploadImage = async (data: dataUploadImage): Promise<responseUploadImage> => {

    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `https://restosync-api.onrender.com/api/images/upload/`,
            data,
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