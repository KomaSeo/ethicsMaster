import React, { useEffect, useState } from "react";

function SelectOnList({ list, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    setSelectedIndex(-1);
    onSelect(-1);
  }, [list.length, onSelect]);
  const displayRow = [];
  for (let index in list) {
    const isSelected = selectedIndex === index;
    const singlePanel = (
      <li
        key={index}
        class={"w-full rounded-lg dark:border-gray-600" + ` border ${isSelected? "border-blue-800 border-4" : "border-gray-200"}`}
      >
        <button
          onClick={()=>{
            setSelectedIndex(index)
            onSelect(index)
          }}
          class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          {list[index]}
        </button>
      </li>
    );
    displayRow.push(singlePanel);
  }
  return (
    <ul class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {displayRow}
    </ul>
  );
}
export { SelectOnList };
