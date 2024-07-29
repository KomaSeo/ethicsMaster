import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import React from "react";
import { createRoot } from "react-dom/client";
import ReactDom from 'react-dom'


const app = express();
const port = process.env.port || 3000
app.use(morgan('tiny'))
app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : true}));


app.get('', (req, res) => {
    res.status(301).redirect('/MainPage');
})

app.get('/MainPage', (req, res) => {
})
app.listen(port, () => {
    console.log(`server is listening to port ${port}.`);
})