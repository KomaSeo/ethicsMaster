import openai from "./OpenAIInstance.js";
import evaluationCards from "./cards.js";
import {extractStringFromDelimiter} from './util.js'

let systemMessage = "For experiment purpose, You are randomly gathering people who will participating in discussion of ethcal use of technology."
systemMessage += "And now you are deciding what kinds of information you should record."
systemMessage += "Suggest what kinds of personal information should be recorded."
systemMessage += 'You should reply with name of personal information inside square brackets, and reason why you choose in curly bracket.';
systemMessage += `example) [example_property] {example reason why this propert should be included.}`
systemMessage += `You should suggest 10 or more kinds of information.`
systemMessage += "Do not include email address, phone number, and participant ID."
systemMessage += "Must contain 'name' property."
systemMessage += "We have 7 ethical concerns. "
systemMessage += "'1.Faireness : Treat all stakeholders equitably and prevent undesirable stereotypes and biased.'"
systemMessage += "'2.Reliability : Build systems to perform safely even in the worst-case scenario.'"
systemMessage += "'3.Privacy and security : Protect data from misuse and unintentional access to ensure privacy rights.'"
systemMessage += "'4.Inclusion : Empower everyone, regardless of ability, and engage people by providing channels for feedback.'"
systemMessage += "'5.Transparency : Create system and outputs that are understandable to relevant stakeholders.'"
systemMessage += "'6.Accountability : Take responsibility for how systems operate and their impact on society.'"
systemMessage += "'7.User Control : Stakeholders, particularly end users, should be able to understand and expect how the system works.'"
systemMessage += "User will pick you what kinds of ethical concern you should focus. And also produce product information you should deal with."
systemMessage += "Suggest property that is related to those concern and product. And don't suggest property that is not related to picked ethical concern or product."
systemMessage += "For example, when user says you should focus on 'faireness', you shouldn't suggest property like 'concern about privacy'."
systemMessage += "Because it is domain of 'privacy and security'. not 'faireness'"

async function generatePersonaProperty(criteria,productInfo) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemMessage },
        {role : "user", content : `We should focus on ${criteria} on this discussion. And we will discuss about ${productInfo}`}
      ],
      model: "gpt-4o-mini",
    });
    const queryResult = completion.choices[0].message.content;
    const propertyList = extractStringFromDelimiter(queryResult,'[',']')
    return propertyList

}

export default generatePersonaProperty