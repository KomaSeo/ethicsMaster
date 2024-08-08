import { useState, useEffect } from "react";
import axios from "axios";
import { RequestButton } from "../serverRequestButton.js";
import {SelectOnList} from "../selectOnList.js"
function ProductManager({onSelectChange}) {
  const [initProductList, setInitProductList] = useState([]);
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
function ProductQuery({ onGenerate }) {
  const [org, setOrg] = useState("AI tech company");
  const [tech, setTech] = useState("Facial Recognition");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [occasion, setOccasion] = useState("");
  const requestConfig = {
    params: {
      organization: org,
      coreTech: tech,
      time: time,
      place: place,
      occasion: occasion,
    },
  }
  function handleScenario(returnScenarioValue) {
    if (typeof onGenerate === "function") {
      onGenerate(returnScenarioValue.data);
    }
  }
  return (
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
      <input
      type="text"
        value={org}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setOrg(e.target.value);
        }}
      ></input>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CoreTech</label>
      <input
      type="text"
        value={tech}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setTech(e.target.value);
        }}
      ></input>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
      <input
      type="text"
        value={time}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setTime(e.target.value);
        }}
      ></input>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place</label>
      <input
      type="text"
        value={place}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setPlace(e.target.value);
        }}
      ></input>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Occasion</label>
      <input
      type="text"
        value={occasion}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setOccasion(e.target.value);
        }}
      ></input>
      <br></br>
      <div className="flex justify-center">
        <RequestButton requestText="Generate Product" proceedText="Generating..." url="/product" onRequest={handleScenario} config={requestConfig}></RequestButton>
      </div>
    </div>
  );
}
function ProductDisplay({ initProductList, onSelectChange }) {
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


  function handleProductChange(index, changeInfo){
    const newProductList = [...productList];
    newProductList[index] = changeInfo;
    setProductList(newProductList);
  }
  const row = [];
  for (let index in productList) {
    const newPanel = (
      <div key={index}>
        <ProductPanel
          productInfo={productList[index]}
          onChange={(changeObject)=>{
            handleProductChange(index,changeObject);
          }}
        ></ProductPanel>
      </div>
    );
    row.push(newPanel);
  }
  return <SelectOnList list={row} onSelect={setIndex}></SelectOnList>;
}
function ProductPanel({ productInfo, onChange, disabled }) {
  const [product, setProduct] = useState(productInfo)
  useEffect(() => {
    setProduct(productInfo)
  }, [productInfo]);
  function handleProductChange(changeObject){
    const newProduct = {...product,
      ...changeObject
    }
    setProduct(newProduct);
    if(typeof(onChange) === "function"){
      onChange(newProduct);
    }
  }
  return (
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">product title</label>
      <input
        type="text"
        disabled={disabled}
        value={product.title}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {
          const changedObject = {title : event.target.value}
          handleProductChange(changedObject)
        }}
      ></input>
      <br></br>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">product explanation</label>
      <textarea
        rows={5}
        disabled={disabled}
        value={product.explanation}
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {
          const changedObject = {explanation : event.target.value}
          handleProductChange(changedObject)
        }}
      ></textarea>
    </div>
  );
}
export { ProductManager, ProductPanel };
