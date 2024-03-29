import { configureStore } from '@reduxjs/toolkit'
import noteReducer from "./actions/noteSlice"
import taskReducer from './actions/taskSlice'
import storeReducer from './actions/storeSlice'
import productReducer from './actions/productsSlice'
import userReducer from './actions/userSlice'

export const store = configureStore({
    reducer: {
        noteReducer,
        taskReducer,
        storeReducer,
        productReducer,
        userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
