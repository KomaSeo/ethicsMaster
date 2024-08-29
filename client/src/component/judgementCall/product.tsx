import * as React from "react";
import { useState, useEffect } from "react";
import { RequestButton } from "../UI/serverRequestButton";
import { SelectOnList } from "../UI/selectOnList";
import CollaborativeEditor from "../UI/collaborativeEditor";
import * as Y from 'yjs'

interface Product {
  title: string;
  explanation: string;
}
interface Scenario {
  organization: string ;
  coreTech: string;
  time: string;
  place: string;
  occasion: string;
}

function ProductManager({
  onSelectChange,
}: {
  onSelectChange: (product: Product) => void;
}) {
  const [initProductList, setInitProductList] = useState<Array<Product>>([]);
  return (
    <div>
      <ProductQuery
        onGenerate={(data) => {
          setInitProductList(data);
        }}
      ></ProductQuery>
      <ProductDisplay
        initProductList={initProductList}
        onSelectChange={onSelectChange}
      ></ProductDisplay>
    </div>
  );
}
function ProductQuery({
  onGenerate,
}: {
  onGenerate: (product: Array<Product>) => void;
}) {
  const [scenarioInfo, setScenarioInfo] = useState<Scenario>({
    organization: "",
    coreTech: "",
    time: "",
    place: "",
    occasion: "",
  });
  const requestConfig = {
    params: scenarioInfo,
  };
  function handleScenario(returnScenarioValue: { data: Array<Product> }) {
    if (typeof onGenerate === "function") {
      onGenerate(returnScenarioValue.data);
    }
  }
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Organization
      </label>
      <CollaborativeEditor
        onTextChange={(text: string) => {
          const newinfo = { ...scenarioInfo };
          newinfo.organization = text;
          setScenarioInfo(newinfo);
        }}
        placeholder="ex) Ai tech company"
        docName={"Scenario:Organization"}
        value={""}
      ></CollaborativeEditor>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        CoreTech
      </label>
      <CollaborativeEditor
        onTextChange={(text: string) => {
          const newinfo = { ...scenarioInfo };
          newinfo.coreTech = text;
          setScenarioInfo(newinfo);
        }}
        placeholder="ex) Facial Recognition"
        docName={"Scenario:CoreTech"}
        value={""}
      ></CollaborativeEditor>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Time
      </label>
      <CollaborativeEditor
        onTextChange={(text: string) => {
          const newinfo = { ...scenarioInfo };
          newinfo.time = text;
          setScenarioInfo(newinfo);
        }}
        placeholder="ex) Facial Recognition"
        docName={"Scenario:time"}
        value={""}
      ></CollaborativeEditor>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Place
      </label>
      <CollaborativeEditor
        onTextChange={(text: string) => {
          const newinfo = { ...scenarioInfo };
          newinfo.place = text;
          setScenarioInfo(newinfo);
        }}
        placeholder="ex) Facial Recognition"
        docName={"Scenario:place"}
        value={""}
      ></CollaborativeEditor>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Occasion
      </label>
      <CollaborativeEditor
        onTextChange={(text: string) => {
          const newinfo = { ...scenarioInfo };
          newinfo.occasion = text;
          setScenarioInfo(newinfo);
        }}
        placeholder="ex) Facial Recognition"
        docName={"Scenario:occasion"}
        value={""}
      ></CollaborativeEditor>
      <br></br>
      <div className="flex justify-center">
        <RequestButton
          requestText="Generate Product"
          proceedText="Generating..."
          url="/product"
          onRequest={handleScenario}
          config={requestConfig}
        ></RequestButton>
      </div>
    </div>
  );
}
function ProductDisplay({
  initProductList,
  onSelectChange,
}: {
  initProductList: Array<Product>;
  onSelectChange: (selectedInfo: Product) => void;
}) {
  /*Currently, if user change content panel, there is a possiblity that it will update Panel twice.
  -once in productPanel->handleProductChange function
  -second update in ProductDisplay.handleProductChange function.
  Functionally, there is no problem. However, needed to be fixed when render time gets too large.
  */
  const [index, setIndex] = useState(-1);
  const [productList, setProductList] = useState(initProductList);
  useEffect(() => {
    if (typeof onSelectChange === "function") {
      onSelectChange(productList[index]);
    }
  }, [index, productList, onSelectChange]);
  useEffect(() => {
    setProductList(initProductList);
  }, [initProductList]);

  function handleProductChange(index: number, changeInfo: Product) {
    const newProductList = [...productList];
    newProductList[index] = changeInfo;
    setProductList(newProductList);
  }
  const row : JSX.Element[] = [];
  for (let index in productList) {
    const indexAsNumber = parseInt(index);
    const newPanel = (
      <div key={index}>
        <ProductPanel
          productInfo={productList[index]}
          onChange={(changeObject) => {
            handleProductChange(indexAsNumber, changeObject);
          }}
          disabled={false}
        ></ProductPanel>
      </div>
    );
    row.push(newPanel);
  }
  return <SelectOnList list={row} onSelect={setIndex}></SelectOnList>;
}
function ProductPanel({
  productInfo,
  onChange,
  disabled,
}: {
  productInfo: Product;
  onChange?: (product: Product) => void;
  disabled: boolean;
}) {
  const [product, setProduct] = useState<Product>(productInfo);
  useEffect(() => {
    setProduct(productInfo);
  }, [productInfo]);
  function handleProductChange(changeObject: Product) {
    setProduct(changeObject);
    onChange?.(changeObject);
  }
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        product title
      </label>      
      <CollaborativeEditor
        onTextChange={(text: string) => {
        const changedObject = {
          ...product,
        };
        changedObject.title = text;
        handleProductChange(changedObject);
        }}
        placeholder="ex) Facial Recognition"
        docName={"Scenario:occasion"}
        value={product.title}
      ></CollaborativeEditor>
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        product explanation
      </label>
      <textarea
        rows={5}
        disabled={disabled}
        value={product.explanation}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {
          const changedObject = {
            ...product,
          };
          changedObject.explanation = event.target.value;
          handleProductChange(changedObject);
        }}
      ></textarea>
    </div>
  );
}
export { ProductManager, ProductPanel, Product ,Scenario };
