import { useState, useEffect } from "react";
import axios from "axios";

function ProductManager({onProductChange}) {
  const [initProductList, setInitProductList] = useState([]);
  return (
    <div>
      <ProductQuery
        onGenerate={(data) => {
          setInitProductList(data);
        }}
      ></ProductQuery>
      <ProductDisplay initProductList={initProductList} onSelectChange={onProductChange}></ProductDisplay>
    </div>
  );
}

function ProductQuery({ onGenerate }) {
  const [org, setOrg] = useState("AI tech company");
  const [tech, setTech] = useState("Facial Recognition");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [occasion, setOccasion] = useState("");
  const [buttonText, setButtonText] = useState("generate scenario");
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  function queryScenario() {
    setIsButtonEnabled(false);
    setButtonText("generating...");
    axios
      .get("/scenario", {
        params: {
          organization: org,
          coreTech: tech,
          time: time,
          place: place,
          occasion: occasion,
        },
      })
      .then((retVal) => {
        handleScenario(retVal);
      });
  }
  function handleScenario(returnScenarioValue) {
    setIsButtonEnabled(true);
    setButtonText("generate Scenario");
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
      <button disabled={!isButtonEnabled} onClick={queryScenario}>
        {buttonText}
      </button>
    </div>
  );
}
function ProductDisplay({ initProductList, onSelectChange }) {
  /*Currently, if user change content panel, there is a possiblity that it will update Panel twice.
  -once in productPanel->handleProductChange function
  -second update in ProductDisplay.handleProductChange function.
  Functionally, there is no problem. However, needed to be fixed when render time gets too large.
  */
  const [selectedIndex , setSelectedIndex] = useState(-1);
  const [productList, setProductList] = useState(initProductList);
  useEffect(()=>{
    setProductList(initProductList);
  },[initProductList])


  function handleSelection(index){
    setSelectedIndex(index);
    if(typeof(onSelectChange) === "function"){
      onSelectChange(productList[index])
    }
  }
  function handleProductChange(index, changeInfo){
    const newProductList = [...productList];
    newProductList[index] = changeInfo;
    setProductList(newProductList);
    const isSelectedIndex = index === selectedIndex;
    if(isSelectedIndex){
      onSelectChange(newProductList[index])
    }
  }
  const row = [];
  for (let index in productList) {
    const isSelected = index === selectedIndex
    const newPanel = (
      <div key={index}>
        <ProductPanel
          productInfo={productList[index]}
          onChange={(changeObject)=>{
            handleProductChange(index,changeObject);
          }}
        ></ProductPanel>
        <button disabled={isSelected} onClick={()=>{
          handleSelection(index)
        }}>{isSelected? "Selected" : "Select"}</button>
      </div>
    );
    row.push(newPanel);
  }
  return <div>{row}</div>;
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
