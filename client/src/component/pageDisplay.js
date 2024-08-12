import React, { useEffect, useState } from "react";

function PageDisplay({ children, contentLabel, currentPage, disabled}) {
  const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    setPageIndex(currentPage);
  }, [currentPage]);
  let content = <div>Page : N/A</div>;
  let lastIndex = -1;
  if (children.length > 0) {
    lastIndex = children.length - 1;
  }
  const isIndexValid = pageIndex <= lastIndex && pageIndex >= 0;
  const selectedButtonClass =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
  const unSelectedButtonClass =
    "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
  const pageSelectButtonList = [];
  for (let index in children) {
    const isSelected = index == pageIndex;
    const selectButton = (
      <button
        disabled={disabled}
        key={index}
        onClick={(e) => {
          setPageIndex(index);
        }}
        className={isSelected ? selectedButtonClass : unSelectedButtonClass}
      >
        {contentLabel?.[index] ?? index.toString() + "index missing"}
      </button>
    );
    pageSelectButtonList.push(selectButton);
  }
  if (!isIndexValid) {
    if (pageIndex !== 0) {
      setPageIndex(0);
    } else {
      content = <div>Page : N/A</div>;
    }
  } else {
    content = children[pageIndex];
  }
  return (
    <div>
      {pageSelectButtonList}
      {content}
    </div>
  );
}

export { PageDisplay };
