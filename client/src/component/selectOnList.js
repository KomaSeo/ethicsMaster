import React, { useEffect, useState } from "react";

function SelectOnList({list, onSelect}){
    const [selectedIndex, setSelectedIndex] = useState(-1);
    useEffect(()=>{
        setSelectedIndex(-1);
        onSelect(-1);
    },[list.length,onSelect])
    const displayRow = [];
    for(let index in list){
        const isSelected = selectedIndex === index;
        const singlePanel = <div key={index}>
            {list[index]}
            <button disabled={isSelected} onClick={()=>{setSelectedIndex(index);onSelect(index)}}>{isSelected? "Selected": "Select"}</button>
        </div>
        displayRow.push(singlePanel);
    }
    return displayRow;
}
export {SelectOnList}