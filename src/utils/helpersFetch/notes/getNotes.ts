import axios from 'axios'
export const getNote = async (): Promise<any> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            "https://restosync-api.onrender.com/api/notes/",
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