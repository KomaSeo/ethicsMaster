import React, { useEffect, useState } from "react";

function DropDownWithArray({ onChange, inputArray, label }) {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    setArr(inputArray);
  }, [inputArray]);
  const optionList = [];
  for (let index in arr) {
    optionList.push(
      <option key={index} value={arr[index]}>
        {arr[index]}
      </option>
    );
  }
  return (
    <div>
      <label htmlFor={label}>Choose a {label}:</label>
      <select
        onChange={(e) => {
          onChange(e.target.value);
        }}
        id={label}
        name={label}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Choose here
        </option>
        {optionList}
      </select>
    </div>
  );
}
export {DropDownWithArray}