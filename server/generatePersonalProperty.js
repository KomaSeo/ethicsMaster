import openai from "./OpenAIInstance.js";
import evaluationCards from "./cards.js";

let systemMessage = "For experiment purpose, You are randomly gathering people who will participating in discussion of ethcal use of technology."
systemMessage += "And now you are deciding what kinds of information you should record."
systemMessage += "Suggest what kinds of personal information should be recorded."
systemMessage += 'You should reply in array format like ["example1", "example2","example_property3",...etc]';
systemMessage += "Do not include email address, phone number and participant ID."

async function generatePersonalProperty(criteria,productInfo) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemMessage },
        {role : "user", content : `We should focus on ${criteria} on this discussion. And we will dicuss about ${productInfo}`}
      ],
      model: "gpt-4o-mini",
    });
    return completion.choices[0].message.content;

}

export default generatePersonalProperty