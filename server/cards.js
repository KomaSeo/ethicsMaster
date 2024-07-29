const evaluationCards = {
    Fairness : "Faireness : Treat all stakeholders equitably and prevent undesirable stereotypes and biased.",
    Reliability : "Reliability : Build systems to perform safely even in the worst-case scenario.",
    Privacy_and_security : "Privacy and security : Protect data from misuse and unintentional access to ensure privacy rights.",
    Inclusion : "Inclusion : Empower everyone, regardless of ability, and engage people by providing channels for feedback.",
    Transparency : "Transparency : Create system and outputs that are understandable to relevant stakeholders.",
    Accountability : "Accountability : Take responsibility for how systems operate and their impact on society.",
    User_control : "User Control : Stakeholders, particularly end users, should be able to understand and expect how the system works."
}
function getEvaluationString(exception){
    
    let retVal = {}
    for(let key in evaluationCards){
        if(evaluationCards[key] != exception){
            retVal[key] = evaluationCards[key];
        }
    }
    return retVal
}
console.log(getExcept(evaluationCards.Accountability));
export default evaluationCards