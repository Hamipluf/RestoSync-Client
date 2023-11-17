import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
// Intefaces
import { dataNote, note } from "../../utils/interfaces";

const initialState = {
    // Esto se leeria como en el useState como la variable con el valor del estado 
    note: {
        id: undefined,
        title: undefined,
        description: undefined,
        owner_id: undefined,
        is_completed: undefined,
        created_at: undefined
    }
}
// Un slice es como una porcion de estado
export const noteSlice = createSlice({
    name: "note",
    initialState,
    // Los reducer es como la funcion Set del use state, son funciones para actualizar el estado del slice
    reducers: {
        setNote: (state, action: PayloadAction<dataNote>) => {
            // @ts-ignore
            state.note = action.payload
        },
        invalidateNote: (state) => {
            // @ts-ignore
            state.note = initialState
        }
    }

})

export const { setNote, invalidateNote } = noteSlice.actions
// @ts-ignore
export const selectNote = (state: RootState) => state.note;
export default noteSlice.reducer