import "./App.css";
import { ServerStatus } from "./component/pipeline/serverStatus.js";
import { ProductManager, ProductPanel } from "./component/pipeline/product.js";
import { CriteriaDrowdownMenu } from "./component/pipeline/criteria.js";
import {
  PropertyQuery,
  PropertyListPanel,
} from "./component/pipeline/personaProperty.js";
import { useEffect, useState } from "react";
import { PersonaManager, PersonaPanel } from "./component/pipeline/persona.js";
import { StanceDropDownMenu } from "./component/pipeline/stance.js";
import { ReveiwPanel } from "./component/pipeline/review.js";
import { PageDisplay } from "./component/pageDisplay.js";
import SiderBar from "./component/navigationSidebar.js";
import { TimeBar } from "./component/progressBar.js";
function Card({ cardHeaderContent, children }) {
  return (
    <div className="max-w-screen-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1>{cardHeaderContent}</h1>
      {children}
    </div>
  );
}

function App() {
  const [selectedProduct, setProduct] = useState(undefined);
  const [criteria, setCriteria] = useState(undefined);
  const [propertyList, setPropertyList] = useState(undefined);
  const [stance, setStance] = useState(undefined);
  const [selectedPersona, setPersona] = useState(undefined);
  const pipelineLabel = [
    "Product",
    "Criteria & PropertyList",
    "Persona 1",
    "Persona 2",
    "Persona 3",
    "Review 1",
    "Review 2",
    "Review 3",
    "Discussion 1",
    "Discussion 2",
    "Discussion 3"
  ];
  const pipelineTime =[
    10000,
    10000,
    10000,
    10000,
    10000,
    10000,
    10000,
    10000,
    10000,
  ]
  const { sideContent } = generateSideBarContent(pipelineLabel);
  const [pageIndex, setPageIndex] = useState(0);
  const [timeBar, setTimeBar] = useState(
    <TimeBar
      key={pageIndex}
      totalTimeInMill={pipelineTime[pageIndex]}
      onExpire={() => {
        setPageIndex(pageIndex + 1);
        resetTimeBar()
      }}
    ></TimeBar>
  );
  useEffect(()=>{
    resetTimeBar()
  },[pageIndex])
  function resetTimeBar() {
    setTimeBar(
      <TimeBar
        key={pageIndex}
        totalTimeInMill={pipelineTime[pageIndex]}
        onExpire={() => {
          setPageIndex(pageIndex + 1);
          resetTimeBar()
        }}
      ></TimeBar>
    );
  }
  return (
    <div>
      <div className="lg:pl-[19.5rem] mx-5 max-w-screen-xl xl:mx-auto">
        <div className="flex justify-between mb-1">
          <h1 className="text-3xl font-bold underline">Ethics Master</h1>

          <ServerStatus></ServerStatus>
        </div>
        {timeBar}

        <PageDisplay currentPage={pageIndex} disabled={false} contentLabel={pipelineLabel}>
          <Card cardHeaderContent={"Product"}>
            <ProductManager onSelectChange={setProduct}></ProductManager>
          </Card>
          <Card cardHeaderContent={"Property"}>
            <CriteriaDrowdownMenu onChange={setCriteria}></CriteriaDrowdownMenu>
            <PropertyQuery
              product={selectedProduct}
              criteria={criteria}
              onChange={setPropertyList}
            ></PropertyQuery>
          </Card>
          <Card cardHeaderContent={"Persona 1"}>
            <PersonaManager
              product={selectedProduct}
              propertyList={propertyList}
              onChangeSelect={setPersona}
            ></PersonaManager>
          </Card>          
          <Card cardHeaderContent={"Persona 2"}>
            <PersonaManager
              product={selectedProduct}
              propertyList={propertyList}
              onChangeSelect={setPersona}
            ></PersonaManager>
          </Card>          
          <Card cardHeaderContent={"Persona 3"}>
            <PersonaManager
              product={selectedProduct}
              propertyList={propertyList}
              onChangeSelect={setPersona}
            ></PersonaManager>
          </Card>
          <Card cardHeaderContent="Review 1">
            <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
            <ReveiwPanel
              product={selectedProduct}
              stance={stance}
              persona={selectedPersona}
              evaluationStandard={criteria}
            ></ReveiwPanel>
          </Card>          
          <Card cardHeaderContent="Review 2">
            <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
            <ReveiwPanel
              product={selectedProduct}
              stance={stance}
              persona={selectedPersona}
              evaluationStandard={criteria}
            ></ReveiwPanel>
          </Card>          
          <Card cardHeaderContent="Review 3">
            <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
            <ReveiwPanel
              product={selectedProduct}
              stance={stance}
              persona={selectedPersona}
              evaluationStandard={criteria}
            ></ReveiwPanel>
          </Card>
        </PageDisplay>
      </div>
    </div>
  );

  function generateSideBarContent(pipelineLabel) {
    const sideContentList = [];
    const sideContentLabel = pipelineLabel;
    if (selectedProduct) {
      sideContentList.push(
        <ProductPanel
          productInfo={selectedProduct}
          disabled={true}
        ></ProductPanel>
      );
    }
    if (propertyList && criteria) {
      sideContentList.push(
        <PropertyListPanel
          disabled={true}
          propertyList={propertyList}
        ></PropertyListPanel>
      );
    }
    if (selectedPersona) {
      sideContentList.push(
        <PersonaPanel
          initPersona={selectedPersona}
          disabled={true}
        ></PersonaPanel>
      );
    }
    const sideContent = (
      <PageDisplay contentLabel={sideContentLabel}>
        {sideContentList}
      </PageDisplay>
    );
    return { sideContentLabel, sideContent };
  }
}

export default App;
