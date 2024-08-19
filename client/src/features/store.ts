import { configureStore } from "@reduxjs/toolkit";
import judgementCallSliceReducer from "./judgementCallSlice";

export default configureStore({
    reducer : {
        judgementCallRoom : judgementCallSliceReducer
    }
})