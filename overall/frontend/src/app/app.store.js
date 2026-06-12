import { configureStore } from "@reduxjs/toolkit";
import authRouter from "../features/auth/state/auth.slice.js"
export const store=configureStore({
    reducer:{
        auth:authRouter
    }
})