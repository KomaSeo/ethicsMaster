import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import React from "react";
import { createRoot } from "react-dom/client";
import ReactDom from "react-dom";
import generateProduct from "./generateProduct.js";
import generatePersonaProperty from "./generatePersonaProperty.js";
import generatePersona from "./generatePersona.js";

const app = express();
const port = process.env.port || 3001;
app.use(morgan("tiny"));
app.use(express.static("./static"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/serverStatus", (req, res) => {
  res.status(200).send("Server Online.");
});
app.get("/product", (req, res) => {
  const { organization, coreTech, time, place, occasion } = req.query;
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
    const productInfo =
      "Product title : " +
      product.title +
      ".\n" +
      "Product explanation : " +
      product.explanation +
      ".";

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
        personaQuery = generatePersona(product,propertyList,distanceType,previousPersonaList);
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


app.listen(port, () => {
  console.log(`server is listening to port ${port}.`);
});
