import openai from "./OpenAIInstance.js";

let systemMessage = "You are teacher of design class."
systemMessage += "Currently we are teaching students 'How might we' question method."
systemMessage += "Description of how might we is as follows."
systemMessage += "-------------------------"
systemMessage += `A How might we (HMW) question can generate lots of creative ideas. Here are some examples of How might we questions: 
How might we ensure more people pay their taxes before the deadline?
How might we help employees stay productive and healthy when working from home?
How might we make customers feel that their information is safe and secure when creating an account?
The How might we template was first introduced by Procter & Gamble in the 1970s and adopted by IDEO. The technique has become popular in design thinking and is used by design teams worldwide.\n`
systemMessage += `5 Tips on Writing Good HMWs
While writing HMW questions seems straightforward, there’s slightly more than meets the eye. The better you write them, the better the ideas that they prompt.

1: Start with the Problems (or Insights) You’ve Uncovered
Some teams generate HMWs that are not specific to what they’ve learned. For example, How might we improve the user experience of the product? is not specific to what you might have uncovered in your discovery research. This question can result in ideas that don’t address the root problems and the insights you uncovered.

Once you and your team have carried out your discovery research, agree on what the top findings were. Use these to craft HMW questions, as in the example below.
Problem	Users aren't aware of the full product offerings.
HMW	: How might we increase awareness of the full product offerings?
2: Avoid Suggesting a Solution in Your HMW Question
It can be easy to limit your thinking and embed solutions in your HMW questions. But doing so restricts the pool of possibilities, and fewer ideas are generated. In the example below, the first HMW suggests a particular type of solution, whereas the second is agnostic about any particular solution.

Insight :	Users are often unsure about which form to complete when they file their taxes.
HMW (poor) :	How might we tell users which form to complete to file their taxes?
HMW (good) :	How might we make users feel confident they are filing their taxes correctly?The problem with the first HMW question is that only solutions related to communication will be generated. With the second HMW, further possibilities could be generated such as filing taxes automatically for users or removing multiple forms and only having one form that presents users with tailored questions based on the user’s responses.

3: Keep Your HMWs Broad
When writing HMW questions, ask yourself if you could rewrite them in a broader way? The broader the HMW, the more ideas can be generated.

Insight :	Users often spend a long time checking their submission for mistakes.
HMW (good) :	How might we make it quick and easy for users to check their work for mistakes?
HMW (better) :	How might we support users to efficiently draft submissions that they’re happy with?
Although we want HMWs to be broad, make sure not to go too broad that you lose sight of the problem you’re trying to solve. For example, How might we redesign the submission-drafting process? would be too broad.

4: Focus Your HMWs on the Desired Outcome
To avoid solving symptoms of the problems rather than the root problems themselves, ask yourself whether your HMW question focuses on the desired outcome. In the example below, the first HMW question loses sight of what we really want to achieve.

Problem :	Users often call us because they’re unsure about the application process.
HMW (poor) :	How might we stop users from calling us?
HMW (good) :	How might we make users feel confident they have all the information they need?
While it’s true that we want to cut costs for unnecessary contact, the high cost is a symptom of the root problem (users are unsure about the application process, and therefore call us). We really want to solve the problem of why users are calling us, which the second HMW question addresses. The desired outcome of our design efforts should be increased user confidence in the application process.

Another problem with the first HMW question is that it can result in a solution like making the contact number on the website harder to find, rather than creative solutions that increase user confidence.

5: Phrase Your HMW Questions Positively
In a similar vein to point 4, stating your HMW questions positively can generate more ideas and also encourage creativity.

If you find yourself using negative verbs like ‘reduce,’ ‘remove,’ ‘prevent,’ ask yourself if you can frame things more positively by using positive action verbs, like ‘increase,’ ‘create,’ ‘enhance,’ ‘promote’ and so on.

Problem :	Users find the return process difficult.
HMW (poor) :	How might we make the return process less difficult?
HMW (good) :	How might we make the return process quick and intuitive?
-------------------------------`
systemMessage += "Now student will give you How might we(HMW) question. Give a critic whether those question is good or not. "
systemMessage += "Give a reason why you thinks it's good or not. Your reasoning must be given according to five description of above explanation."
systemMessage += "If statement was bad, Give one example of good question related to student's question."

let userMessage = `Problem : Couples in their 40s and 50s need to improve or maintain their marital relationship through conversation, spending time together and solving problems because a good marital relationship has a positive effect on both individuals and family.
HMW question : HMW make them enjoy their hobbies together?`
const message = []
message.push({ role: "system", content: systemMessage })
message.push({ role: "user", content : userMessage});
const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-4o-mini",
  });

console.log(completion.choices[0].message)