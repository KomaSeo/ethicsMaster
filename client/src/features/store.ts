import { configureStore } from "@reduxjs/toolkit";
import RoomSlice from "./RoomSlice";

const store =  configureStore({
    reducer : {
        RoomSlice : RoomSlice
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store