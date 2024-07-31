import './App.css';
import { ServerStatus } from './component/serverStatus.js';
import { ProductManager } from './component/product.js';
import { CriteriaDrowdownMenu } from './component/criteria.js';

function App() {
  return (
    <div>
      <ServerStatus></ServerStatus>
      <ProductManager></ProductManager>
      <CriteriaDrowdownMenu></CriteriaDrowdownMenu>
    </div>
  );
}




export default App;
