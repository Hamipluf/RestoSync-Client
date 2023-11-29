import axios from 'axios'
import {
    responseAddProduct,
    updateProduct,
} from '../../interfaces';

const updateProduct = async (data: updateProduct): Promise<responseAddProduct> => {
    const pid = data.pid
    const dataUpdate = {
        title: data.title,
        description: data.description,
        price: data.price,
        stock_quantity: data.stock_quantity,
        category: data.category,
        store_id: data.store_id
    }
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.put(
            `https://restosync-api.onrender.com/api/products/udapte/${pid}`,
            dataUpdate,
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
export default updateProduct