import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
// Intefaces
import { product } from "../../utils/interfaces/products";

const initialState = {
    product: {
        id: undefined,
        title: undefined,
        description: undefined,
        price: undefined,
        stock_quantity: undefined,
        category: undefined,
        store_id: undefined
    }
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<product>) => {
            // @ts-ignore
            state.product = { ...action.payload }
        },
        invalidateProduct: (state) => {
            // @ts-ignore
            state.product = initialState.product
        }

    }

})

export const { setProduct, invalidateProduct } = productSlice.actions
// @ts-ignore
export const selectStore = (state: RootState) => state.product.product;
export default productSlice.reducer