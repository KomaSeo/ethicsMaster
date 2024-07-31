import './App.css';
import { ServerStatus } from './component/serverStatus.js';
import { ProductManager } from './component/product.js';
import { CriteriaDrowdownMenu } from './component/criteria.js';
import { PropertyQuery } from './component/personaProperty.js'
import { useEffect, useState } from 'react';

function App() {
  const [product, setProduct] = useState(undefined);
  const [criteria, setCriteria] = useState(undefined);
  const [propertyList , setPropertyList] = useState(undefined);
  return (
    <div>
      <ServerStatus></ServerStatus>
      <ProductManager onSelectChange={setProduct}></ProductManager>
      <CriteriaDrowdownMenu onChange={setCriteria}></CriteriaDrowdownMenu>
      <PropertyQuery product={product} criteria={criteria} onChange={setPropertyList}></PropertyQuery>
    </div>
  );
}




export default App;
