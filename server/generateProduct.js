import openai from "./OpenAIInstance.js";
import fs from 'fs'
import {saveImageFromUrl} from './util.js'

const organization = "computer tech industry"
const target = "Airport"
const targetTech = "AI"
let systemMessage = `You're a product designer in ${organization}. You're working on desining product for ${target}.`
systemMessage += `You should provide product which use ${targetTech} technology.`
systemMessage += "You should provide product idea realted to user's request."
systemMessage += "You should emphasize title of your idea by triple quotes like '''example product title'''."
systemMessage += 'You should emphasize content of your idea by triple double quotes like """example product explanation"""'
systemMessage += "You should provide three or more product idea."

async function main() {
    const productList = await generateProduct();
    for(let productTitle in productList){
        generateProductImage(productTitle,productList[productTitle])
    }
}

async function generateProduct() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemMessage },
        ],
        model: "gpt-4o-mini",
        n: 1
    });
    const exampleProductTitle = [];
    const exampleProductExplanation = [];
    const replyString = completion.choices[0].message.content;
    const productNumber = (replyString.split("'''").length - 1) / 2;
    const productList = {}
    for (let i = 0; i < productNumber; i++) {
        productList[replyString.split("'''")[1 + 2 * i]] = replyString.split('"""')[1 + 2 * i];
    }
    return productList;
}

function generateProductImage(exampleProductTitle, exampleProductExplanation) {
    const exampleProduct = exampleProductTitle + "\n" + exampleProductExplanation;
    const response = openai.images.generate({
        model: "dall-e-3",
        prompt: exampleProduct,
        size: "1024x1024",
        quality: "standard",
        n: 1,
        style: "vivid",
    }
    );
    response.then((value) => {
        saveImageFromUrl(value.data[0].url, "./result/" + exampleProductTitle + ".jpg");
    }).catch((reason) => {
        console.log(reason);
    });
}

export default generateProduct;