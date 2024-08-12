import openai from "./OpenAIInstance.js";

let systemMessage = "You are product manager."
systemMessage += "You should make question lists for product details."
systemMessage += "Number of questions must be around 10."

let userMessage = "Product title : Smart Event Access Control\n"
userMessage += "Imagine a system used at large events or conferences to streamline entry. This product would utilize facial recognition to quickly identify attendees upon arrival, allowing them to bypass long lines. It could integrate with ticketing systems to ensure that only authorized individuals gain access, enhancing security and efficiency during high-traffic times."
const message = []
message.push({ role: "system", content: systemMessage })
message.push({ role: "user", content : userMessage});
const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-4o-mini",
  });

console.log(completion.choices[0].message)