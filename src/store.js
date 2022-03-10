import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './features/alert/AlertSlice'
import LibroSlice from "./features/libros/LibroSlice";
export default configureStore({
    reducer: {
        alert: alertReducer,
        libro:LibroSlice
    },
})