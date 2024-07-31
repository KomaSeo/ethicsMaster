import openai from "./OpenAIInstance.js";
import fs from 'fs'
import {saveImageFromUrl, extractStringFromDelimiter} from './util.js'


async function main() {
    const productList = await generateProduct();
    for(let productTitle in productList){
        generateProductImage(productTitle,productList[productTitle])
    }
}

async function generateProduct(organization, coreTech, time = null, place = null, occasion = null) {

    let systemMessage = `You're a product designer in ${organization}. You're working on desining product`
    if(place || time || occasion){
        systemMessage += ` for `
        if(place) systemMessage += `place : ${place}`
        if(time) systemMessage += `time : ${time}`
        if(occasion) systemMessage += `occasion : ${occasion}`
        console.log(occasion)

    }
    systemMessage += `.`
    systemMessage += `You should provide product which use ${coreTech} technology.`
    systemMessage += "You should provide product idea realted to user's request."
    systemMessage += "You should emphasize title of your idea by triple quotes like '''example product title'''."
    systemMessage += 'You should emphasize content of your idea by triple double quotes like """example product explanation"""'
    systemMessage += "You should provide three or more product idea."


    let userMessage = `You should working on product which will be used at following situation.`
    userMessage += `Place : ${place}.`
    userMessage += `Time : ${time}`
    userMessage += `Occasion : ${occasion}`

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemMessage },
            {role : "user", content : userMessage}
        ],
        model: "gpt-4o-mini",
        n: 1
    });
    const replyString = completion.choices[0].message.content;
    const titleList = extractStringFromDelimiter(replyString,"'''","'''");
    const explanationList = extractStringFromDelimiter(replyString,'"""','"""');
    const productList = []
    for(let i = 0; i < titleList.length; i++){
        const newProduct = {};
        newProduct["title"] = titleList[i];
        newProduct["explanation"] = explanationList[i];
        productList.push(newProduct);
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