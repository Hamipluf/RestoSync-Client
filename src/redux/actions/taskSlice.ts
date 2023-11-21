import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
// Intefaces
import { task } from "../../utils/interfaces";

const initialState = {
    task: {
      id: undefined,
      name: undefined,
      created_at: undefined,
      user_id: undefined,
      is_completed: undefined
    }
}
export const taskSlice = createSlice({
    name: "taks",
    initialState,
    reducers: {
        setTask: (state, action: PayloadAction<task>) => {
            // @ts-ignore
            state.task = { ...action.payload }
        },
        invalidateTask: (state) => {
            // @ts-ignore
            state.task = initialState
        }
    }

})

export const { setTask, invalidateTask } = taskSlice.actions
// @ts-ignore
export const selectTask = (state: RootState) => state.task.task;
export default taskSlice.reducer