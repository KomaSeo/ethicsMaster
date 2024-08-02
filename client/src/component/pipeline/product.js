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
    <div>
      <label>Organization</label>
      <textarea
        value={org}
        onChange={(e) => {
          setOrg(e.target.value);
        }}
      ></textarea>
      <br />
      <label>CoreTech</label>
      <textarea
        value={tech}
        onChange={(e) => {
          setTech(e.target.value);
        }}
      ></textarea>
      <br />
      <label>Time</label>
      <textarea
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
        }}
      ></textarea>
      <br />
      <label>Place</label>
      <textarea
        value={place}
        onChange={(e) => {
          setPlace(e.target.value);
        }}
      ></textarea>
      <br />
      <label>Occasion</label>
      <textarea
        value={occasion}
        onChange={(e) => {
          setOccasion(e.target.value);
        }}
      ></textarea>
      <br />
      <RequestButton requestText="Generate Product" proceedText="Generating..." url="/product" onRequest={handleScenario} config={requestConfig}></RequestButton>
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
function ProductPanel({ productInfo, onChange }) {
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
      <label>product title</label>
      <textarea
        value={product.title}
        onChange={(event) => {
          const changedObject = {title : event.target.value}
          handleProductChange(changedObject)
        }}
      ></textarea>
      <br></br>
      <label>product explanation</label>
      <textarea
        value={product.explanation}
        onChange={(event) => {
          const changedObject = {explanation : event.target.value}
          handleProductChange(changedObject)
        }}
      ></textarea>
    </div>
  );
}
export { ProductManager };
