import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {RequestButton} from "../serverRequestButton.js"

function PropertyQuery({ product, criteria, onChange }) {
  const [propertyList, setPropertyList] = useState([]);
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(propertyList);
    }
  }, [propertyList, onChange]);
  const row = [];
  const queryConfig = {
    params: {
      product: product,
      criteria: criteria,
    },
  }
  for (let index in propertyList) {
    const propertyText = (
      <div className="grid grid-cols-5" key={index}>
        <input
          type="text"
          class="col-span-4 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            handlePropertyChange(index, e.target.value);
          }}
          value={propertyList[index]}
        ></input>
        <button
          onClick={() => {
            deleteProperty(index);
          }}
          class="col-span-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Delete
        </button>
      </div>
    );
    row.push(propertyText);
  }
  return (
    <div >
      {row}
      <button
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={addEmptyProperty}>
        Add property
      </button>
      <RequestButton onRequest={retval=>{setPropertyList(retval.data)}} url={"/personaProperty"} config={queryConfig} requestText="generate Property" proceedText="generating..."></RequestButton>
    </div>
  );

  function addEmptyProperty() {
    const newList = [...propertyList];
    newList.push("");
    setPropertyList(newList);
  }
  function handlePropertyChange(index, changeObject) {
    const newArray = [...propertyList];
    newArray[index] = changeObject;
    setPropertyList(newArray);
  }
  function deleteProperty(index) {
    const deletedList = propertyList.filter((val, valIndex) => {
      if (valIndex == index) {
        return false;
      } else {
        return true;
      }
    });
    setPropertyList(deletedList);
  }
}
export { PropertyQuery };
