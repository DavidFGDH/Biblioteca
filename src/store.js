import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './features/counter/AlertSlice'

export default configureStore({
    reducer: {
        alert: alertReducer,
    },
})