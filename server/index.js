import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import React from "react";
import { createRoot } from "react-dom/client";
import { convertPersonaToString, convertProductToStirng } from "./util.js";
import ReactDom from "react-dom";
import generateProduct from "./generateProduct.js";
import generatePersonaProperty from "./generatePersonaProperty.js";
import generatePersona from "./generatePersona.js";
import generateReview from "./generateReview.js";

const app = express();
const port = process.env.port || 3001;
app.use(morgan("tiny"));
app.use(express.static("./static"));
app.use(bodyParser.urlencoded({ extended: true }));


const debug = true;
app.get("/serverStatus", (req, res) => {
  res.status(200).send("Server Online.");
});
app.get("/product", (req, res) => {
  const { organization, coreTech, time, place, occasion } = req.query;
  if(debug){
    console.log("product request ------ \n")
    console.log("organization : " + organization + "\n");
    console.log("coreTech : " + coreTech + "\n");
    console.log("time : " + time + "\n");
    console.log("place : " + place + "\n");
    console.log("occasion : " + occasion + "\n");
  }
  const productQuery = generateProduct(
    organization,
    coreTech,
    time,
    place,
    occasion
  );
  productQuery.then((productResult) => {
    res.status(200).send(productResult);
  });
});
app.get("/personaProperty", (req, res) => {
  let propertyQuery;
  try {
    const { criteria, product } = req.query;  
    const productInfo = convertProductToStirng(product)

    if(debug){
      console.log("property request ------ \n")
      console.log("criteria : " + criteria + "\n");
      console.log("product : " + productInfo + "\n");
    }
    propertyQuery = generatePersonaProperty(
      criteria,
      productInfo
    );
  } catch (e) {
    res.status(400).send("Bad request." + e);
  }
  
  propertyQuery.then((personaProperty) => {
    res.status(200).send(personaProperty);
  }).catch((e)=>{
    res.status(500).send("Backend server failed. Try again");
    console.log(e)
  });
});
app.get("/persona", (req, res)=>{
    let personaQuery;
    try{
        const {product, propertyList, distanceType, previousPersonaList} = req.query
        if(!product || !propertyList || !distanceType){
          throw new Error("Not enough parameter for query.")
        }
        const productString = convertProductToStirng(product)
        const personaStringList = []
        for(let personaIndex in previousPersonaList){
          const personaString = convertPersonaToString(previousPersonaList[personaIndex])
          personaStringList.push(personaString)
        }
        if(debug){
          console.log("persona request ------ \n")
          console.log("product : " + productString + "\n");
          console.log("property : " + propertyList + "\n");
          console.log("distanceType : " + distanceType + "\n");
          console.log("personaStringList : " + personaStringList + "\n");
        }
        personaQuery = generatePersona(productString,propertyList,distanceType,personaStringList);
        personaQuery.then((generatedPersona)=>{
          res.status(200).send(generatedPersona)
        }).catch((e)=>{
          res.status(500).send("Backend server failed. Try again")
          console.log(e);
        })
    }
    catch (e) {
      res.status(400).send("Bad request.");
    }
})
app.get("/review",(req,res)=>{
  let reviewQuery;
  try{
    const {persona, product, stance, evaluationStandard} = req.query
    if(!persona || !product || !stance || !evaluationStandard){
      throw new Error("Not enough parmeter for query")
    }
    const personaString = convertPersonaToString(persona);
    const productString = convertProductToStirng(product)
    reviewQuery = generateReview(personaString,productString,stance,evaluationStandard);
    reviewQuery.then((generatedReview)=>{
      res.status(200).send(generatedReview)
    }).catch((e)=>{
      res.status(500).send("Backend server failed. Try again")
      console.log(e);
    })
  }
  catch(e){
    res.status(500).send("Backend server failed. Try again")
    console.log(e);
  }
})

app.listen(port, () => {
  console.log(`server is listening to port ${port}.`);
});
