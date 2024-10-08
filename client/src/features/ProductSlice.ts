import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../component/judgementCall/product";
import * as Y from "yjs";
interface SyncProduct {
  title: Y.Text | null;
  explanation: Y.Text | null;
}

const product: SyncProduct = {
  title: null,
  explanation: null,
};
export const scenarioSlice = createSlice({
  name: "scenarioSlice",
  initialState: product,
  reducers: {
    setTitle(state, actions: PayloadAction<string>) {
      state.title?.delete(0, state.title.length);
      state.title?.insert(0, actions.payload);
    },
    setExplanation(state, actions: PayloadAction<string>) {
      state.explanation?.delete(0, state.explanation.length);
      state.explanation?.insert(0, actions.payload);
    },
  },
});
export const { setTitle, setExplanation } = scenarioSlice.actions;
export default scenarioSlice.reducer;
