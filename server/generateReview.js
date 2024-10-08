import openai from "./OpenAIInstance.js"


async function generateReview(stakeholder, product, stance, evaluationStandard) {
    let systemMessage = ""
    systemMessage += "Your personal information is shown at below.\n"
    systemMessage += `${stakeholder}`;
    systemMessage += `For a given product, you should write a review in aspect of ${evaluationStandard}.`
    systemMessage += `You should write ${stance} review for product`
    systemMessage += `You should write review using various personal information that given at above.`
    systemMessage += `Try to write with specific usage case.`
    systemMessage += `It would be good if usage case is closely related to your personal information.`
    systemMessage += "Length of review may 15 lines."
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