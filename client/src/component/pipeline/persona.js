import { useEffect, useState } from "react";
import { DropDownWithArray } from "../dropdown.js";
import { RequestButton } from "../serverRequestButton.js";
import { SelectOnList } from "../selectOnList.js";
const distanceOption = ["direct", "indirect", "excluded"];

function PersonaManager({
  product,
  propertyList: generatePropertyList,
  onChangeSelect,
}) {
  const [personaList, setPersonaList] = useState([]);
  const [distanceType, setDistanceType] = useState(undefined);
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
  function handlePersonaChange(index, manipulatedPersona) {
    const newList = [...personaList];
    newList[index] = manipulatedPersona;
    setPersonaList(newList);
  }
  function addPersona(newPersona) {
    const newList = [...personaList];
    newList.push(newPersona);
    setPersonaList(newList);
  }
  const panelList = [];
  for (let i in personaList) {
    const newPanel = (
      <div key={i}>
        <PersonaPanel
          initPersona={personaList[i]}
          onChange={(changeInfo) => handlePersonaChange(i, changeInfo)}
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
        onRequest={(retVal) => {
          addPersona(retVal.data);
        }}
      ></RequestButton>
      <SelectOnList list={panelList} onSelect={setIndex}></SelectOnList>
    </div>
  );
}
function PersonaPanel({ initPersona, onChange, disabled}) {
  const [propertyList, setPropertyList] = useState([]);
  useEffect(() => {
    setPropertyList(initPersona);
  }, [initPersona]);
  function handlePropertyChange(index, changeInfo) {
    const newPropertyList = [...propertyList];
    newPropertyList[index] = changeInfo;
    setPropertyList(newPropertyList);
    onChange(newPropertyList);
  }
  const propertyRow = [];
  for (let i in propertyList) {
    const propertyPanel = (
      <div className="grid grid-cols-4" key={i}>
        <input
          type="text"
          className="bg-gray-50 border text-xs border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={propertyList[i].propertyName}
          disabled={disabled}
          onChange={(e) => {
            handlePropertyChange(i, { propertyName: e.target.value });
          }}
        ></input>
        <input
          type="text"
          className="bg-gray-50 border text-xs border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 col-span-3"
          value={propertyList[i].propertyContent}
          disabled={disabled}
          onChange={(e) => {
            handlePropertyChange(i, { propertyContent: e.target.value });
          }}
        ></input>
      </div>
    );
    propertyRow.push(propertyPanel);
  }
  return <div>{propertyRow}</div>;
}
export { PersonaManager,PersonaPanel };
