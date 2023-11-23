import axios from "axios";
import { addProduct, responseAddProduct } from "../../interfaces";

const addProduct = async (data: addProduct): Promise<responseAddProduct> => {
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.post(
      `https://restosync-api.onrender.com/api/products/create`,
      data,
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
export default addProduct;
