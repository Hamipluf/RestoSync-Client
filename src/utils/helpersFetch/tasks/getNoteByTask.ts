import axios from "axios";
import { responseGetNoteByTaskId } from "../../interfaces";

const getNoteByTask = async (params: any): Promise<responseGetNoteByTaskId> => {
    const tid: number = params.queryKey[1]
    const token = localStorage.getItem("jwt");
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/notes/task/${tid}`,
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