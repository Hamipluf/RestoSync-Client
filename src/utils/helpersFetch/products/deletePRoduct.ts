import axios from "axios";
import { responseAddProduct } from "../../interfaces";

const deleteProduct = async (pid: number): Promise<responseAddProduct> => {
    const token = localStorage.getItem("jwt");
    try {
        const response = await axios.delete(
            `https://restosync-api.onrender.com/api/products/delete/${pid}`,
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
export default deleteProduct;
