import { useEffect, useState } from "react";
import * as React from "react";
import { RequestButton } from "../UI/serverRequestButton.js";
import { Product } from "./product.js";

interface Property {
  name: string;
  value: string | undefined;
}

function PropertyQuery({
  product,
  criteria,
  onChange,
}: {
  product: Product | undefined;
  criteria: string | undefined;
  onChange: (propertyList: Array<Property>) => void;
}) {
  const [propertyList, setPropertyList] = useState<Array<Property>>([]);
  const disabled = false;
  const queryConfig = {
    params: {
      product: product,
      criteria: criteria,
    },
  };
  function handleChange(changedList: Array<Property>) {
    if (typeof onChange === "function") {
      onChange(changedList);
    }
    setPropertyList(changedList);
  }

  return (
    <div>
      <PropertyListPanel
        propertyList={propertyList}
        setPropertyList={handleChange}
        disabled={disabled}
      ></PropertyListPanel>
      <RequestButton
        onRequest={(retval: { data: Array<string> }) => {
          const newPropList: Property[] = [];
          for (let index in retval.data) {
            newPropList.push({ name: retval.data[index], value: "" });
          }
          handleChange(newPropList);
        }}
        url={"/personaProperty"}
        config={queryConfig}
        requestText="generate Property"
        proceedText="generating..."
      ></RequestButton>
    </div>
  );
}
function PropertyListPanel({
  propertyList,
  setPropertyList,
  disabled,
}: {
  propertyList: Array<Property>;
  setPropertyList: (array: Array<Property>) => void;
  disabled: boolean;
}) {
  const row: React.JSX.Element[] = [];
  for (let index in propertyList) {
    const indexAsNumber = parseInt(index);
    const content = (
      <input
        type="text"
        className="col-span-4 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          handlePropertyNameChange(indexAsNumber, e.target.value);
        }}
        value={propertyList[index].name}
      ></input>
    );
    const deleteButton = (
      <button
        onClick={() => {
          deleteProperty(indexAsNumber);
        }}
        className="col-span-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Delete
      </button>
    );
    const propertyText = (
      <div className={disabled ? "" : "grid grid-cols-5"} key={index}>
        {content}
        {disabled ? undefined : deleteButton}
      </div>
    );
    row.push(propertyText);
  }
  if (!disabled) {
    const buttonForAddProperty = (
      <button
        key={propertyList.length ?? 0}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={addEmptyProperty}
      >
        Add property
      </button>
    );

    row.push(buttonForAddProperty);
  }
  function addEmptyProperty() {
    const newList = [...propertyList];
    newList.push({
      name: "",
      value: undefined,
    });
    setPropertyList(newList);
  }
  function handlePropertyNameChange(index: number, changeObject: string) {
    const newArray = [...propertyList];
    newArray[index].name = changeObject;
    setPropertyList(newArray);
  }
  function deleteProperty(index: number) {
    const deletedList = propertyList.filter((val, valIndex) => {
      if (valIndex === index) {
        return false;
      } else {
        return true;
      }
    });
    setPropertyList(deletedList);
  }
  return row;
}
export { PropertyQuery, PropertyListPanel, Property };
