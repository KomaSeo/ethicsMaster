import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
interface EvaluationPersona {
  evaluationCriteria : string | null;
  PersonaProperty : Array<string> | null;
  PersonaInformation : Array<String> | null;
}
const syncDoc = new Y.Doc();
const roomId = 1234;
const wsProvider = new WebsocketProvider(
  "ws://localhost:1234",
  roomId.toString(),
  syncDoc
);
const personaArray : Array<EvaluationPersona> = new Array<EvaluationPersona>();

export const personaSlice = createSlice({
  name: "personaSlice",
  initialState: personaArray,
  reducers: {
    addPersona(state, actions){
        const newPersona :EvaluationPersona = {
            evaluationCriteria: "",
            PersonaProperty: new Array<string>(),
            PersonaInformation: new Array<string>()
        }
        state.push(newPersona)
    },
    addProperty(state, actions : PayloadAction<number>){
        const targetPerosnaIndex : number = actions.payload
        state[targetPerosnaIndex].PersonaProperty?.push("");
        state[targetPerosnaIndex].PersonaInformation?.push("");
    }
    deleteProperty(state, actions : PayloadAction<number,number>){
    }
  },
});