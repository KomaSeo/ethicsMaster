import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Scenario, Product } from "../component/judgementCall/product";

const scenario : Scenario = {
    organization: "Ai tech company",
    coreTech: "Facial Recognition",
    time: "night",
    place: "airport",
    occasion: "waiting for flight"
}
export const scenarioSlice = createSlice({
  name: "scenarioSlice",
  initialState: scenario,
  reducers: {
    setOrganization(state, actions : PayloadAction<string>){
        state.organization = actions.payload
    },
    setCoreTech(state, actions : PayloadAction<string>){
        state.organization = actions.payload
    },
    setTime(state, actions : PayloadAction<string>){
        state.organization = actions.payload
    },
    setPlace(state, actions : PayloadAction<string>){
        state.organization = actions.payload
    },
    setOccasion(state, actions : PayloadAction<string>){
        state.organization = actions.payload
    },
  },
});
export const { setOrganization, setCoreTech,setTime,setPlace,setOccasion } = scenarioSlice.actions;
export default scenarioSlice.reducer;