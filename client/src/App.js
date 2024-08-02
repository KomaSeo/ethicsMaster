import './App.css';
import { ServerStatus } from './component/pipeline/serverStatus.js';
import { ProductManager } from './component/pipeline/product.js';
import { CriteriaDrowdownMenu } from './component/pipeline/criteria.js';
import { PropertyQuery } from './component/pipeline/personaProperty.js'
import { useEffect, useState } from 'react';
import { PersonaManager} from './component/pipeline/persona.js'

function App() {
  const [product, setProduct] = useState(undefined);
  const [criteria, setCriteria] = useState(undefined);
  const [propertyList , setPropertyList] = useState(undefined);
  console.log (propertyList)
  return (
    <div>
      <ServerStatus></ServerStatus>
      <ProductManager onSelectChange={setProduct}></ProductManager>
      <CriteriaDrowdownMenu onChange={setCriteria}></CriteriaDrowdownMenu>
      <PropertyQuery product={product} criteria={criteria} onChange={setPropertyList}></PropertyQuery>
      <PersonaManager product={product} propertyList={propertyList}></PersonaManager>
    </div>
  );
}




export default App;
