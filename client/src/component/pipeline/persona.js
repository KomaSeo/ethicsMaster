import axios from "axios";
import { useEffect, useState } from "react";
import {DropDownWithArray} from '../dropdown.js'
import { RequestButton } from "../serverRequestButton.js";
import { SelectOnList } from "../selectOnList.js";
const distanceOption = ["direct", "indirect", "excluded"]

function PersonaManager({product, propertyList: generatePropertyList, onChangeSelect}){
    const [personaList, setPersonaList] = useState([]);
    const [distanceType, setDistanceType] = useState(undefined);
    const [index, setIndex] = useState(-1);
    useEffect(()=>{
        if(typeof(onChangeSelect) == "function"){
            onChangeSelect(personaList[index]);
        }
    },[index,personaList,onChangeSelect])
    const personaParam = {
        params : {
            product : product,
            propertyList : generatePropertyList,
            distanceType : distanceType,
            previousPersonaList : personaList
        }
    }
    function handlePersonaChange(index, manipulatedPersona){
        const newList = [...personaList]
        newList[index] = manipulatedPersona;
        setPersonaList(newList);
    }
    function addPersona(newPersona){
        const newList = [...personaList]
        newList.push(newPersona);
        setPersonaList(newList);
    }
    const panelList = []
    for(let i in personaList){
        const newPanel = <div  key={i}><PersonaPanel initPersona={personaList[i]} onChange={changeInfo => handlePersonaChange(i,changeInfo)}></PersonaPanel>
        <br></br>
        </div>
        panelList.push(newPanel)
    }
    return(<div>
        <DropDownWithArray onChange={setDistanceType} inputArray={distanceOption} label={"type of stakeholder."}></DropDownWithArray>
        <RequestButton requestText="generate persona" proceedText="generating..." url={"/persona"} config={personaParam} onRequest={(retVal)=>{addPersona(retVal.data)}}></RequestButton>
        <SelectOnList list={panelList} onSelect={setIndex}></SelectOnList>
    </div>)
}
function PersonaPanel({initPersona, onChange}){
    const [propertyList, setPropertyList] = useState([]);
    useEffect(()=>{
        setPropertyList(initPersona);
    },[initPersona])
    function handlePropertyChange(index,changeInfo){
        const newPropertyList = [...propertyList];
        newPropertyList[index] = changeInfo;
        setPropertyList(newPropertyList)
        onChange(newPropertyList);
    }
    const propertyRow = [];
    for(let i in propertyList){
        const propertyPanel = <div key={i}>
        <textarea value={propertyList[i].propertyName} onChange={(e)=>{
            handlePropertyChange(i,{propertyName : e.target.value})
        }}></textarea>
        <textarea value={propertyList[i].propertyContent} onChange={(e)=>{
            handlePropertyChange(i,{propertyContent : e.target.value})
        }}></textarea>
        </div>
        propertyRow.push(propertyPanel);
    }
    return(<div>
        {propertyRow}
    </div>)

}
export {PersonaManager}