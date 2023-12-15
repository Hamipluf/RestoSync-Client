import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
// Intefaces
import { user } from "../../utils/interfaces/user";

const initialState = {
    user: {
        id: undefined,
        name: undefined,
        last_name: undefined,
        email: undefined,
        username: undefined,
        role: undefined,
        photos: undefined
    }
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<user>) => {
            // @ts-ignore
            state.user = { ...action.payload }
        },
        setUid: (state, action: PayloadAction<number>) => {
            // @ts-ignore
            state.user.id = action.payload;
        },
        invalidateUser: (state) => {
            // @ts-ignore
            state.user = initialState.user,
                // @ts-ignore
                state.uid = initialState.uid
        }
    }

})

export const { setUser, invalidateUser, setUid } = userSlice.actions
// @ts-ignore
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer