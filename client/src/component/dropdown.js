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
      <label htmlFor={label}class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a {label}:</label>
      <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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