import openai from "./OpenAIInstance.js";
import evaluationCards from "./cards.js";

async function generateDiscussionForReview(
  product,
  review,
  personaList,
  discussionLength
) {
  let discussionContent = ""
  let returnContent = ""
  for(let discussionIndex=0; discussionIndex < discussionLength; discussionIndex++){
    const personaIndex = discussionIndex % personaList.length;
    const targetPersona = personaList[personaIndex];
    const singleDiscussion = await generateSingleDiscussion(discussionContent, product,targetPersona,review);
    discussionContent += singleDiscussion + "\n";
    returnContent += "\n------------------------------\n" + singleDiscussion
  }
  return returnContent
}
async function generateSingleDiscussion(discussionContent, product, targetPersona, review) {
  let systemMessage = "You're personal information is as followed"
  systemMessage += targetPersona
  systemMessage += `You are participating a ethical discussion about ${product}.`;
  systemMessage += `For that product, one of the participants wrote a review concerning ethical problems. The review is as follows.`
  systemMessage += "<Review>"
  systemMessage += review;
  systemMessage += "</Review>"
  systemMessage += `Discussion is held to find an ethical solution for a problem that is suggested at review.`
  systemMessage += `Other participant's discuss is given by Dialogue.`
  systemMessage +=
    'You should reply to others with your opinion.'
  systemMessage +=  `Your should reply in Dialogue format with your name. example - YourName : YourOpinon.`
  systemMessage += `Your opinion length should be around 5 lines.`;
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        {
          role: "user",
          content: discussionContent,
        },
      ],
      model: "gpt-4o-mini",
    });
    return completion.choices[0].message.content;
}

export default generateDiscussionForReview