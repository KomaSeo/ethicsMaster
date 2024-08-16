import * as React from "react";
import { useState, useEffect } from "react";
import { RequestButton } from "../UI/serverRequestButton.js";
import {SelectOnList} from "../UI/selectOnList.js"
import CollaborativeEditor from "../UI/collaborativeEditor.js";

interface Product {
  title : string,
  explanation : string 
}
interface ScenarioInfo { 
  organization : string,
  coreTech : string,
  time : string,
  place : string,
  occasion : string
}


function ProductManager({onSelectChange} : {onSelectChange : (product : Product)=>void}) {
  const [initProductList, setInitProductList] = useState<Array<Product>>([]);
  return (
    <div>
      <ProductQuery
        onGenerate={(data) => {
          setInitProductList(data);
        }}
      ></ProductQuery>
      <ProductDisplay initProductList={initProductList} onSelectChange={onSelectChange}></ProductDisplay>
    </div>
  );
}
function ProductQuery({ onGenerate } : {onGenerate : (product : Array<Product>) => void}) {
  const [scenarioInfo,setScenarioInfo] = useState<ScenarioInfo>({
    organization : "",
    coreTech : "",
    time : "",
    place : "",
    occasion : ""
  });
  const requestConfig = {
    scenarioInfo,
  }
  function handleScenario(returnScenarioValue : {data : Array<Product>}) {
    if (typeof onGenerate === "function") {
      onGenerate(returnScenarioValue.data);
    }
  }
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>      
      <input
      type="text"
      placeholder="ex) Ai tech company"
        value={scenarioInfo.organization}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          const newinfo = {...scenarioInfo}
          newinfo.organization = e.target.value
          setScenarioInfo(newinfo)
        }}
      ></input>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CoreTech</label>
      <input
      type="text"
      placeholder="ex) Facial Recognition"
        value={scenarioInfo.coreTech}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          const newInfo = {...scenarioInfo}
          newInfo.coreTech = e.target.value
          setScenarioInfo(newInfo)
        }}
      ></input>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
      <input
      type="text"
      placeholder="ex) night time"
        value={scenarioInfo.time}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          const newInfo = {...scenarioInfo};
          newInfo.time = e.target.value
          setScenarioInfo(newInfo)
        }}
      ></input>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place</label>
      <input
      type="text"
      placeholder="ex) airport"
        value={scenarioInfo.place}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          const newInfo = {...scenarioInfo};
          newInfo.place = e.target.value
          setScenarioInfo(newInfo)
        }}
      ></input>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Occasion</label>
      <input
      type="text"
        value={scenarioInfo.occasion}
        placeholder="ex) waiting for plane"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          const newInfo = {...scenarioInfo};
          newInfo.occasion = e.target.value;
          setScenarioInfo(newInfo);
        }}
      ></input>
      <br></br>
      <div className="flex justify-center">
        <RequestButton requestText="Generate Product" proceedText="Generating..." url="/product" onRequest={handleScenario} config={requestConfig}></RequestButton>
      </div>
    </div>
  );
}
function ProductDisplay({ initProductList, onSelectChange } : {initProductList : Array<Product>, onSelectChange : (selectedInfo : Product)=>void}) {
  /*Currently, if user change content panel, there is a possiblity that it will update Panel twice.
  -once in productPanel->handleProductChange function
  -second update in ProductDisplay.handleProductChange function.
  Functionally, there is no problem. However, needed to be fixed when render time gets too large.
  */
  const [index , setIndex] = useState(-1);
  const [productList, setProductList] = useState(initProductList);
  useEffect(()=>{
    if(typeof(onSelectChange)==="function"){
      onSelectChange(productList[index])
    }
  },[index,productList,onSelectChange])
  useEffect(()=>{
    setProductList(initProductList);
  },[initProductList])


  function handleProductChange(index :number , changeInfo : Product){
    const newProductList = [...productList];
    newProductList[index] = changeInfo;
    setProductList(newProductList);
  }
  const row = [];
  for (let index in productList) {
    const indexAsNumber = parseInt(index)
    const newPanel = (
      <div key={index}>
        <ProductPanel
          productInfo={productList[index]}
          onChange={(changeObject)=>{
            handleProductChange(indexAsNumber,changeObject);
          }}
          disabled={false}
        ></ProductPanel>
      </div>
    );
    row.push(newPanel);
  }
  return <SelectOnList list={row} onSelect={setIndex}></SelectOnList>;
}
function ProductPanel({ productInfo, onChange, disabled } : { productInfo : Product, onChange : (product : Product)=>void, disabled : boolean}) {
  const [product, setProduct] = useState<Product>(productInfo)
  useEffect(() => {
    setProduct(productInfo)
  }, [productInfo]);
  function handleProductChange(changeObject : Product){

    setProduct(changeObject);
    if(typeof(onChange) === "function"){
      onChange(changeObject);
    }
  }
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">product title</label>
      <input
        type="text"
        disabled={disabled}
        value={product.title}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {    
          const changedObject = {
            ...product,
          }
          changedObject.title = event.target.value
          handleProductChange(changedObject)
        }}
      ></input>
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">product explanation</label>
      <textarea
        rows={5}
        disabled={disabled}
        value={product.explanation}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {
          const changedObject = {
            ...product,
          }
          changedObject.explanation = event.target.value
          handleProductChange(changedObject)
        }}
      ></textarea>
    </div>
  );
}
export { ProductManager, ProductPanel, Product };
