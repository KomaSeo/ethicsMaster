import openai from "./OpenAIInstance.js";
import {extractStringFromDelimiter} from './util.js'

const distanceToTech = [
  "Direct Stakeholders : those who interact directly with the technology and can include end users, designers, engineers, hackers, and administrators.",
  "Indirect Stakeholders : Do not interact with the technology but are affected by its use. This group of stakeholders can include advocacy groups, families of end users, regulators, and society at large.",
  "Excluded Stakeholders are those who cannot or do not use the technology. Reasons for exclusion can include physical, cognitive, social, or situational constraints.",
];


async function generatePersona(
  product,
  propertyList,
  distanceType,
  previousPersonaList = null
) {
  propertyList.push("stakeholder_group")
  let systemMessage = `You are a product manager who involved in discussion about ethical concern. `;
  systemMessage += `For a given product, You should suggest stakeholders group who are related to product.`;
  systemMessage += `You should suggest only one stakeholder group. `;
  systemMessage += `You should generate one representative person and his(or her) information.`;
  systemMessage += `In personal information, you should contain ${propertyList}.`;
  systemMessage += `Definition of direct, indirect, excluded stakeholders are as follows. ${distanceToTech[0]}, ${distanceToTech[1]}, ${distanceToTech[2]}.`;
  systemMessage += `You should suggest ${distanceType} type of stakeholder.`
  systemMessage += `You should reply by containing name of personal information by square bracket, and containing personal information content by curly bracket.`
  systemMessage += `For example, for prduct which can be used in airport you can suggest like : "[Name] {Bruce Wayne} [Age] {41} ... [stakeholder_group] {passenger#direct stakeholder}\n"`
  systemMessage += `When You write stakeholder_group, don't use ambiguous word like "end user".`
  if(previousPersonaList !=null){
    systemMessage += "After product information, other stakeholder list will be given.";
    systemMessage += "You must suggest a stakeholder who has a very different background from people on the list."
  }

  const message = []

  message.push({ role: "system", content: systemMessage })
  message.push({    role: "user",
    content:`${product}\n`,
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
  console.log(product)
  const queryString = completion.choices[0].message.content;
  const generatedPropertyList = extractStringFromDelimiter(queryString,'[',']');
  const generatedContentList = extractStringFromDelimiter(queryString,"{","}");
  if(generatedPropertyList.length != generatedContentList.length){
    throw Error(`Length of generated Propertylist and generated Contentlist is different. The Query string is "${queryString}".`)
  }
  const personaInfoList = []
  for(let i=0; i < generatedPropertyList.length; i++){
    const singlePersonaInfo = {
      propertyName : generatedPropertyList[i],
      propertyContent : generatedContentList[i]
    } 
    personaInfoList.push(singlePersonaInfo);
  }
  return personaInfoList;
}

export default generatePersona;