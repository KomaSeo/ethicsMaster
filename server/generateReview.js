import openai from "./OpenAIInstance.js"


async function generateReview(stakeholder, product, stance, evaluationStandard) {
    let systemMessage = ""
    systemMessage += "Your personal information is shown at below.\n"
    systemMessage += `${stakeholder}`;
    systemMessage += `He/Her have ${stance} impression for product`
    systemMessage += `For a given product, you should write a review in aspect of ${evaluationStandard}.`
    systemMessage += "Length of review may 10 lines."
    systemMessage += "You should introduce yourself at first line."
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemMessage },
        {role : "user", content : product}
      ],
      model: "gpt-4o-mini",
    });
    return completion.choices[0].message.content;

}

export default generateReview;