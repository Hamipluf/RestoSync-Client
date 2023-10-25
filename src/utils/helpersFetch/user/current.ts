import axios from 'axios'
export const getCurrent = async (): Promise<any> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            "https://restosync-api.onrender.com/api/users/current",
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