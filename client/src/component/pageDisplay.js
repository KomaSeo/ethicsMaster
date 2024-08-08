import React, { useState } from "react";


function PageDisplay({contentArray}){
    const [pageIndex, setPageIndex] = useState(0);
    let content = <div>Page : N/A</div>
    let lastIndex = -1;
    if(contentArray){
        lastIndex = contentArray.length - 1
    }
    const isIndexValid = pageIndex <= lastIndex && pageIndex >= 0;
    const canMoveLeft = pageIndex >= 1;
    const canMoveRight = pageIndex < lastIndex;
    if(!isIndexValid){
        if(pageIndex != 0){
            setPageIndex(0);
        }
        else{
            console.log("content array is empty for pageDisplay")
            content = <div></div>
        }
    }
    else{
        content = contentArray[pageIndex];
    }
    return(<div>
        {content}
        <button disabled={!canMoveLeft}>left</button>
        <button disabled={!canMoveRight}>right</button>
    </div>)
}

export {PageDisplay}