import React from "react";
import {DropDownWithArray} from "../UI/dropdown.js"
const initStanceCards = ["Very Positive", "Positive", "neutral", "negative", "very negative"]

function StanceDropDownMenu({ onChange }) {
    return (
      <DropDownWithArray label={"review stance"} inputArray={initStanceCards} onChange={onChange}></DropDownWithArray>
    );
  }

  export {StanceDropDownMenu}