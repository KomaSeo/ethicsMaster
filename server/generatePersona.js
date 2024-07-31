import openai from "./OpenAIInstance.js";

const distanceToTech = [
  "Direct Stakeholders : those who interact directly with the technology and can include end users, designers, engineers, hackers, and administrators.",
  "Indirect Stakeholders : Do not interact with the technology but are affected by its use. This group of stakeholders can include advocacy groups, families of end users, regulators, and society at large.",
  "Excluded Stakeholders are those who cannot or do not use the technology. Reasons for exclusion can include physical, cognitive, social, or situational constraints.",
];


async function generateStakeHolder(
  product,
  criteria,
  previousPersonaList = null
) {
  let systemMessage = `You are a product manager who involved in discussion about ethical concern. `;
  systemMessage += `For a given product, You should suggest stakeholders group who are related to product.`;
  systemMessage += `You should suggest only one stakeholder group. `;
  systemMessage += `You should generate one representative person and his(or her) information.`;
  systemMessage += `In personal information, you should contain ${criteria}.`;
  if(previousPersonaList !=null){
    systemMessage += "After product information, other stakeholder list will be given.";
    systemMessage += "You must suggest a stakeholder who has a very different background from people on the list."
  }
  systemMessage += `You should suggest direct type of stakeholder.`
  systemMessage += `Definition of direct, indirect, excluded stakeholders are as follows. ${distanceToTech[0]}, ${distanceToTech[1]}, ${distanceToTech[2]}.`;

  const message = []
  message.push({ role: "system", content: systemMessage })
  message.push({    role: "user",
    content:`Given Product : ${product}`,
  })
  if(previousPersonaList != null){
    for(let persona in previousPersonaList){
      message.push({role: "user", content : `Stake Holder ${persona} Information : ${previousPersonaList[persona]}`})
    }
  }

  const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-4o-mini",
  });
  return completion.choices[0].message.content;
}

export default generateStakeHolder;