import { useEffect, useState } from "react";
import * as React from "react";
function DropDownWithArray({ onChange, inputArray, label } : {onChange : (str : string)=>void, inputArray : Array<string>, label : string}) {
  const [arr, setArr] = useState<Array<string>>([]);
  useEffect(() => {
    setArr(inputArray);
  }, [inputArray]);
  const optionList : React.ReactNode[] = [];
  for (let index in arr) {
    optionList.push(
      <option key={index} value={arr[index]}>
        {arr[index]}
      </option>
    );
  }

  return (
    <div>
      <label htmlFor={label}className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a {label}:</label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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