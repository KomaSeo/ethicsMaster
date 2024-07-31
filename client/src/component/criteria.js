import React from "react";
import ReactDOM from "react-dom";
const initEvaluationCards = [
  "'Faireness : Treat all stakeholders equitably and prevent undesirable stereotypes and biased.'",
  "'Reliability : Build systems to perform safely even in the worst-case scenario.'",
  "'Privacy and security : Protect data from misuse and unintentional access to ensure privacy rights.'",
  "'Inclusion : Empower everyone, regardless of ability, and engage people by providing channels for feedback.'",
  "'Transparency : Create system and outputs that are understandable to relevant stakeholders.'",
  "'Accountability : Take responsibility for how systems operate and their impact on society.'",
  "'User Control : Stakeholders, particularly end users, should be able to understand and expect how the system works.'",
];
function CriteriaDrowdownMenu() {
  const optionList = [];
  for (let index in initEvaluationCards) {
    optionList.push(
      <option key={index} value={initEvaluationCards[index]}>
        {initEvaluationCards[index]}
      </option>
    );
  }
  return (
    <div>
      <label htmlFor="evaluationCriteria">Choose a car:</label>
      <select id="evaluationCriteria" name="evaluationCriteria">
        {optionList}
      </select>
    </div>
  );
}
export { CriteriaDrowdownMenu };
