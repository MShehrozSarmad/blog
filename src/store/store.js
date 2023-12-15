import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        postSlc: postSlice
    }
})

export default store;