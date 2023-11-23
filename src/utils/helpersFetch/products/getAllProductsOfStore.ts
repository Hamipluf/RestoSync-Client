import axios from "axios";
import { responseGetAllProduct } from "../../interfaces";

const getAllProductsOfStore = async (params: any): Promise<responseGetAllProduct> => {
    const sid: number = params.queryKey[1]
    const token = localStorage.getItem("jwt");
    try {
        const response = await axios.get(
            `https://restosync-api.onrender.com/api/stores/products/${sid}`,
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

export default getAllProductsOfStore