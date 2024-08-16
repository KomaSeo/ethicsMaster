import { useEffect, useState } from "react";
import { DropDownWithArray } from "../UI/dropdown";
import { RequestButton } from "../UI/serverRequestButton";
import { SelectOnList } from "../UI/selectOnList";
import { Product } from "./product.js";
import { Property } from "./personaProperty";
import * as React from "react";
const distanceOption = ["direct", "indirect", "excluded"];

type Persona = Array<Property> 

function PersonaManager({
  product,
  propertyList: generatePropertyList,
  onChangeSelect,
} : {
  product : Product,
  propertyList : Array<Property>,
  onChangeSelect : (selectedPersona : Persona)=>void

}) {
  const [personaList, setPersonaList] = useState<Array<Persona>>([]);
  const [distanceType, setDistanceType] = useState<string>("");
  const [index, setIndex] = useState(-1);
  useEffect(() => {
    if (typeof onChangeSelect == "function") {
      onChangeSelect(personaList[index]);
    }
  }, [index, personaList]);
  const personaParam = {
    params: {
      product: product,
      propertyList: generatePropertyList,
      distanceType: distanceType,
      previousPersonaList: personaList,
    },
  };
  function handlePersonaChange(index : number, manipulatedPersona : Persona) {
    const newList = [...personaList];
    newList[index] = manipulatedPersona;
    setPersonaList(newList);
  }
  function addPersona(newPersona : Persona) {
    const newList = [...personaList];
    newList.push(newPersona);
    setPersonaList(newList);
  }
  const panelList = [];
  for (let i in personaList) {
    const indexAsNumber = parseInt(i)
    const newPanel = (
      <div key={i}>
        <PersonaPanel
          initPersona={personaList[i]}
          onChange={(changeInfo) => handlePersonaChange(indexAsNumber, changeInfo)}
          disabled={false}
        ></PersonaPanel>
      </div>
    );
    panelList.push(newPanel);
  }
  <div>{panelList}</div>;
  return (
    <div>
      <DropDownWithArray
        onChange={setDistanceType}
        inputArray={distanceOption}
        label={"type of stakeholder."}
      ></DropDownWithArray>
      <RequestButton
        requestText="generate persona"
        proceedText="generating..."
        url={"/persona"}
        config={personaParam}
        onRequest={(retVal : {data : Persona}) => {
          addPersona(retVal.data);
        }}
      ></RequestButton>
      <SelectOnList list={panelList} onSelect={setIndex}></SelectOnList>
    </div>
  );
}
function PersonaPanel({ initPersona, onChange, disabled} : {initPersona : Persona, onChange : (changedPersona : Persona)=>void , disabled : boolean}) {
  const [persona, setPropertyList] = useState<Persona>([]);
  useEffect(() => {
    setPropertyList(initPersona);
  }, [initPersona]);
  function handlePropertyChange(index : number, changeInfo : Property) {
    const newPropertyList = [...persona];
    newPropertyList[index] = changeInfo;
    setPropertyList(newPropertyList);
    onChange(newPropertyList);
  }
  const propertyRow = [];
  for (let i in persona) {
    const indexAsNumber = parseInt(i)
    const propertyPanel = (
      <div className="grid grid-cols-4" key={i}>
        <input
          type="text"
          className="bg-gray-50 border text-xs border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={persona[i].name}
          disabled={disabled}
          onChange={(e) => {
            const changedName = e.target.value
            handlePropertyChange(indexAsNumber, { name : changedName, value : persona[i].value });
          }}
        ></input>
        <input
          type="text"
          className="bg-gray-50 border text-xs border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 col-span-3"
          value={persona[i].value}
          disabled={disabled}
          onChange={(e) => {
            const changedValue = e.target.value
            handlePropertyChange(indexAsNumber, { name : persona[i].name, value : changedValue });
          }}
        ></input>
      </div>
    );
    propertyRow.push(propertyPanel);
  }
  return <div>{propertyRow}</div>;
}
export { PersonaManager,PersonaPanel , Persona };
