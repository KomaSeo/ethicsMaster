import React from "react";
import ReactDOM from "react-dom";
import { DropDownWithArray } from "../dropdown.js";
const initEvaluationCards = [
  "'Faireness : Treat all stakeholders equitably and prevent undesirable stereotypes and biased.'",
  "'Reliability : Build systems to perform safely even in the worst-case scenario.'",
  "'Privacy and security : Protect data from misuse and unintentional access to ensure privacy rights.'",
  "'Inclusion : Empower everyone, regardless of ability, and engage people by providing channels for feedback.'",
  "'Transparency : Create system and outputs that are understandable to relevant stakeholders.'",
  "'Accountability : Take responsibility for how systems operate and their impact on society.'",
  "'User Control : Stakeholders, particularly end users, should be able to understand and expect how the system works.'",
];
function CriteriaDrowdownMenu({ onChange }) {
  return (
    <DropDownWithArray label={"evaluation criteria"} inputArray={initEvaluationCards} onChange={onChange}></DropDownWithArray>
  );
}
export { CriteriaDrowdownMenu };
