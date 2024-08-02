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
      <div key={index}>
        <textarea
          onChange={(e) => {
            handlePropertyChange(index, e.target.value);
          }}
          value={propertyList[index]}
        ></textarea>
        <button
          onClick={() => {
            deleteProperty(index);
          }}
        >
          Delete
        </button>
      </div>
    );
    row.push(propertyText);
  }
  return (
    <div>
      <RequestButton onRequest={retval=>{setPropertyList(retval.data)}} url={"/personaProperty"} config={queryConfig} requestText="generate Property" proceedText="generating..."></RequestButton>
      {row}
      <button onClick={addEmptyProperty}>
        Add property
      </button>
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
