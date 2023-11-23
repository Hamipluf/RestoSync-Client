import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
// Intefaces
import { product } from "../../utils/interfaces";

const initialState = {
    visibleProducts: false,
    prduct: {
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
        },
        setVisibleProducts: (state) => {
            // @ts-ignore
            state.visibleProducts = true
        },
        setHiddenProducts: (state) => {
            // @ts-ignore
            state.visibleProducts = initialState.visibleProducts
        }
    }

})

export const { setProduct, invalidateProduct, setHiddenProducts, setVisibleProducts } = productSlice.actions
// @ts-ignore
export const selectStore = (state: RootState) => state.product.product;
export default productSlice.reducer