import { useEffect, useState } from "react";
import * as React from "react"; 
function SelectOnList({ list, onSelect } : {list : Array<React.JSX.Element>, onSelect : (index : number)=>void}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    setSelectedIndex(-1);
    onSelect(-1);
  }, [list.length, onSelect]);
  const displayRow : React.ReactNode[] = [];
  for (let index in list) {
    const indexAsNumber = parseInt(index)
    const isSelected = selectedIndex === indexAsNumber;
    const singlePanel = (
      <li
        key={index}
        className={`w-full rounded-lg dark:border-gray-600 border ${isSelected? "border-blue-800 border-4" : "border-gray-200"}`}
      >
        <button
          onClick={()=>{
            setSelectedIndex(indexAsNumber)
            onSelect(indexAsNumber)
          }}
          className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          {list[index]}
        </button>
      </li>
    );
    displayRow.push(singlePanel);
  }
  return (
    <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {displayRow}
    </ul>
  );
}
export { SelectOnList };
