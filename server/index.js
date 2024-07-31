import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import React from "react";
import { createRoot } from "react-dom/client";
import ReactDom from 'react-dom'
import generateProduct from "./generateProduct.js";


const app = express();
const port = process.env.port || 3001
app.use(morgan('tiny'))
app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : true}));


app.get('/serverStatus', (req, res) => {
    res.status(200).send("Server Online.");
})
app.get('/scenario',(req,res)=>{
    const {organization, coreTech, time, place, occasion} = req.query
    const productQuery = generateProduct(organization,coreTech,time,place,occasion);
    productQuery.then((productResult)=>{
        res.status(200).send(productResult)
    })
    
})
app.listen(port, () => {
    console.log(`server is listening to port ${port}.`);
})