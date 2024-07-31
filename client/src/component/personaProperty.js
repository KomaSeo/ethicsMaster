import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function PropertyQuery({ product, criteria, onChange }) {
  const [isQueryProceed, setIsQueryProceed] = useState(false);
  const [propertyList, setPropertyList] = useState([]);
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(propertyList);
    }
  }, [propertyList, onChange]);
  const row = [];
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
      <button disabled={isQueryProceed} onClick={queryProperty}>
        {isQueryProceed ? "generating..." : "generate property"}
      </button>
      {row}
      <button disabled={isQueryProceed} onClick={addEmptyProperty}>
        Add property
      </button>
    </div>
  );

  function queryProperty() {
    setIsQueryProceed(true);
    axios
      .get("/personaProperty", {
        params: {
          product: product,
          criteria: criteria,
        },
      })
      .then((queryResult) => {
        setPropertyList(queryResult.data);
      })
      .catch((queryResult) => {
        console.log(queryResult.message);
      })
      .finally(() => {
        setIsQueryProceed(false);
      });
  }
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
