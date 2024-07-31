import openai from "./OpenAIInstance.js";
import evaluationCards from "./cards.js";
import {extractStringFromDelimiter} from './util.js'

let systemMessage = "For experiment purpose, You are randomly gathering people who will participating in discussion of ethcal use of technology."
systemMessage += "And now you are deciding what kinds of information you should record."
systemMessage += "Suggest what kinds of personal information should be recorded."
systemMessage += 'You should reply with name of personal information inside square brackets, and reason why you choose in curly bracket.';
systemMessage += `example) [example_property] {example reason why this propert should be included.}`
systemMessage += `You should suggest 10 or more kinds of information.`
systemMessage += "Do not include email address, phone number and participant ID."

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