import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface roomState{
    roomId : number,
    userId : number
}

const newRoom : roomState = {
    roomId : 0,
    userId : 0
}
export const judgementCallSlice = createSlice({
  name: "judgementCallRoom",
  initialState: newRoom,
  reducers: {
    setRoomId(state, actions : PayloadAction<number>){
        state.roomId = actions.payload;
    },
    setUserId (state, actions : PayloadAction<number>){
        state.userId = actions.payload
    }
  },
});

export const { setRoomId, setUserId } = judgementCallSlice.actions;
export default judgementCallSlice.reducer;