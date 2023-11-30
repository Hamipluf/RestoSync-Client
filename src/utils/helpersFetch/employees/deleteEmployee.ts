import axios from "axios";
import {  responseAssignEmploye } from "../../interfaces";

const deleteEmployee = async (eid: number): Promise<responseAssignEmploye> => {
    const token = localStorage.getItem("jwt");
    try {
        const response = await axios.delete(
            `https://restosync-api.onrender.com/api/employees/delete/${eid}`,
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
export default deleteEmployee;
