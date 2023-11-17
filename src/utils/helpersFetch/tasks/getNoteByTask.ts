import axios from "axios";
import { notes } from "../../interfaces";

const getNoteByTask = async (params: any): Promise<notes> => {
    const nid: number = params.queryKey[1]
    const token = localStorage.getItem("jwt");
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/tasks/all/notes/${nid}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export default getNoteByTask