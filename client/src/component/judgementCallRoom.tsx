import { ServerStatus } from "./judgementCall/serverStatus";
import { Product, ProductManager, ProductPanel } from "./judgementCall/product";
import { CriteriaDrowdownMenu } from "./judgementCall/criteria";
import { PropertyQuery, PropertyListPanel } from "./judgementCall/personaProperty";
import { useEffect, useState } from "react";
import { Persona, PersonaManager, PersonaPanel } from "./judgementCall/persona";
import { StanceDropDownMenu } from "./judgementCall/stance";
import { ReveiwPanel } from "./judgementCall/review";
import { PageDisplay } from "./UI/pageDisplay";
import SiderBar from "./UI/navigationSidebar";
import { TimeBar, StageBar } from "./UI/progressBar";
import { useLoaderData } from "react-router-dom";
import { Property } from "./judgementCall/personaProperty";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId, setUserId } from "../features/judgementCallSlice";
function Card({ cardHeaderContent, children } : {cardHeaderContent : string, children : React.ReactNode}) {
  return (
    <div className="max-w-screen-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1>{cardHeaderContent}</h1>
      {children}
    </div>
  );
}

function JudgementCall() {
  const { userId, roomId } = useLoaderData() as {userId : number , roomId : number};//Currently data loader for react-router-dom doesn't support typescript.
  const dispatch = useDispatch()
  const [selectedProduct, setProduct] = useState<Product>();
  const [criteria, setCriteria] = useState<string>();
  const [propertyList, setPropertyList] = useState<Array<Property>>();
  const [stance, setStance] = useState<string>();
  const [selectedPersonaList, setSelectedPersona] = useState<Array<Persona>>([]);
  const gameLabel = [
    "Identify the product",
    "Brainstorm and identify stakeholders",
    "Writing reviews",
    "Discussion",
  ];
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
    "Discussion 3",
  ];
  const pipelineTime = [
    20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000,
  ];
  const { sideContent } = generateSideBarContent(pipelineLabel);
  const [pageIndex, setPageIndex] = useState(0);
  const [timeBar, setTimeBar] = useState(
    <TimeBar
      key={pageIndex}
      totalTimeInMill={pipelineTime[pageIndex]}
      onExpire={() => {
        setPageIndex(pageIndex + 1);
        resetTimeBar();
      }}
    ></TimeBar>
  );
  useEffect(()=>{
    dispatch(setRoomId(roomId));
    dispatch(setUserId(userId));
  },[])
  useEffect(() => {
    resetTimeBar();
  }, [pageIndex]);
  function resetTimeBar() {
    setTimeBar(
      <TimeBar
        key={pageIndex}
        totalTimeInMill={pipelineTime[pageIndex]}
        onExpire={() => {
          setPageIndex(pageIndex + 1);
          resetTimeBar();
        }}
      ></TimeBar>
    );
  }
  return (
    <div className="max-w-screen-xl xl:mx-auto">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Judgement Call
      </h1>
      <ServerStatus></ServerStatus>
      <div className="lg:pr-[19.5rem] mx-5 max-w-screen-xl xl:mx-auto">
        <SiderBar content={sideContent}></SiderBar>

        <div className="flex justify-between mb-1"></div>
        {timeBar}

        <StageBar stageList={gameLabel} proceedIndex={2}></StageBar>
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
            onChangeSelect={(persona) => {
              const newPersonaList = [...selectedPersonaList];
              newPersonaList[0] = persona;
              setSelectedPersona(newPersonaList);
            }}
          ></PersonaManager>
        </Card>
        <Card cardHeaderContent={"Persona 2"}>
          <PersonaManager
            product={selectedProduct}
            propertyList={propertyList}
            onChangeSelect={(persona) => {
              const newPersonaList = [...selectedPersonaList];
              newPersonaList[1] = persona;
              setSelectedPersona(newPersonaList);
            }}
          ></PersonaManager>
        </Card>
        <Card cardHeaderContent={"Persona 3"}>
          <PersonaManager
            product={selectedProduct}
            propertyList={propertyList}
            onChangeSelect={(persona) => {
              const newPersonaList = [...selectedPersonaList];
              newPersonaList[2] = persona;
              setSelectedPersona(newPersonaList);
            }}
          ></PersonaManager>
        </Card>
        <Card cardHeaderContent="Review 1">
          <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
          <ReveiwPanel
            product={selectedProduct}
            stance={stance}
            persona={selectedPersonaList?.[0]}
            evaluationStandard={criteria}
          ></ReveiwPanel>
        </Card>
        <Card cardHeaderContent="Review 2">
          <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
          <ReveiwPanel
            product={selectedProduct}
            stance={stance}
            persona={selectedPersonaList?.[1]}
            evaluationStandard={criteria}
          ></ReveiwPanel>
        </Card>
        <Card cardHeaderContent="Review 3">
          <StanceDropDownMenu onChange={setStance}></StanceDropDownMenu>
          <ReveiwPanel
            product={selectedProduct}
            stance={stance}
            persona={selectedPersonaList?.[2]}
            evaluationStandard={criteria}
          ></ReveiwPanel>
        </Card>
      </div>
    </div>
  );

  function generateSideBarContent(pipelineLabel : Array<string>) {
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
          setPropertyList={function (array: Array<Property>): void {
            console.log("Setting property list is disabled.")
          } }></PropertyListPanel>
      );
    }
    for (let index in selectedPersonaList) {
      sideContentList.push(
        <PersonaPanel
          key={index}
          initPersona={selectedPersonaList[index]}
          disabled={true} onChange={function (changedPersona: Persona): void {
            console.log("Setting property list is disabled.")
          } }></PersonaPanel>
      );
    }

    const sideContent = (
      <PageDisplay 
        contentLabel={sideContentLabel} 
        children={sideContentList} 
        currentPage={0} 
        isControllable={true}>
      </PageDisplay>
    );
    return { sideContentLabel, sideContent };
  }
}

export default JudgementCall;
