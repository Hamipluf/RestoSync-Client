import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
// Intefaces
import { store } from "../../utils/interfaces";

const initialState = {
    store: {
        id: undefined,
        name: undefined,
        company_name: undefined,
        address: undefined,
        cuit: undefined,
        owner_id: undefined,
    }
}
export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setStore: (state, action: PayloadAction<store>) => {
            // @ts-ignore
            state.store = { ...action.payload }
        },
        invalidateStore: (state) => {
            // @ts-ignore
            state.store = initialState
        }
    }

})

export const { setStore, invalidateStore } = storeSlice.actions
// @ts-ignore
export const selectStore = (state: RootState) => state.store.store;
export default storeSlice.reducer