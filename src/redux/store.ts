import { configureStore } from '@reduxjs/toolkit'
import noteReducer from "./actions/noteSlice"
import taskReducer from './actions/taskSlice'

export const store = configureStore({
    reducer: {
        noteReducer,
        taskReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
