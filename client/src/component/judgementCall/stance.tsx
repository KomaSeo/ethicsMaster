import * as React from "react";
import {DropDownWithArray} from "../UI/dropdown"
const initStanceCards = ["Very Positive", "Positive", "neutral", "negative", "very negative"]

function StanceDropDownMenu({ onChange } : {onChange : (changeString : string)=>void}) {
    return (
      <DropDownWithArray label={"review stance"} inputArray={initStanceCards} onChange={onChange}></DropDownWithArray>
    );
  }

  export {StanceDropDownMenu}