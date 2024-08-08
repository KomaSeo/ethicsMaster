import "./App.css";
import { ServerStatus } from "./component/pipeline/serverStatus.js";
import { ProductManager, ProductPanel } from "./component/pipeline/product.js";
import { CriteriaDrowdownMenu } from "./component/pipeline/criteria.js";
import { PropertyQuery } from "./component/pipeline/personaProperty.js";
import { useEffect, useState } from "react";
import { PersonaManager } from "./component/pipeline/persona.js";
import { StanceDropDownMenu } from "./component/pipeline/stance.js";
import { ReveiwPanel } from "./component/pipeline/review.js";
import { PageDisplay } from "./component/pageDisplay.js";
import TestPanel from "./component/test.js";
import SiderBar from "./component/navigationSidebar.js";
function App() {
  const [selectedProduct, setProduct] = useState(undefined);
  const [criteria, setCriteria] = useState(undefined);
  const [propertyList, setPropertyList] = useState(undefined);
  const [stance, setStance] = useState(undefined);
  const [selectedPersona, setPersona] = useState(undefined);
  const sideContentList = []
  if(selectedProduct){
    sideContentList.push(<ProductPanel productInfo={selectedProduct} disabled={true}></ProductPanel>)
  }
  if(propertyList && criteria){
    
  }
  const sideContent = <PageDisplay contentArray={sideContentList}></PageDisplay>
  return (
    <div>
      <SiderBar content={sideContent}></SiderBar>
      <div className="lg:pl-[19.5rem] mx-5 max-w-screen-xl xl:mx-auto">
        <TestPanel></TestPanel>
        <ServerStatus></ServerStatus>
        <div class="max-w-screen-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 id="productHeader">Prouct</h1>
          <ProductManager onSelectChange={setProduct}></ProductManager>
        </div>
        <div class="max-w-screen-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 id="propertyHeader">Property</h1>
        <CriteriaDrowdownMenu onChange={setCriteria}></CriteriaDrowdownMenu>
        <PropertyQuery
          product={selectedProduct}
          criteria={criteria}
          onChange={setPropertyList}
        ></PropertyQuery>
        </div>
        
        <div class="max-w-screen-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 id="personaHeader">Persona</h1>
        <PersonaManager
          product={selectedProduct}
          propertyList={propertyList}
          onChangeSelect={setPersona}
        ></PersonaManager>
        </div>
        <div class="max-w-screen-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 id="reviewPanel">Review</h1>
        <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
        <ReveiwPanel
          product={selectedProduct}
          stance={stance}
          persona={selectedPersona}
          evaluationStandard={criteria}
        ></ReveiwPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
