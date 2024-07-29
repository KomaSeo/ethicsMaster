import './App.css';

function App() {
  return (
    <div>
      <ChatResult></ChatResult>
      <ChatInput></ChatInput>
      <AgentPanel></AgentPanel>
    </div>
  );
}

function ChatResult(){
  return(
    <div>TODO : This is Chat Result.</div>
  )
}
function ChatInput(){
  return(
    <div>TODO : this is Chat Input.<textarea></textarea><button>Send</button></div>
  )
}
function AgentPanel(){
  return (
    <div>
      <button>Generate New Agent</button>
      <AgentManipulation></AgentManipulation>
    </div>
  )
}
function AgentManipulation(){
  const row = []
  for (let i=0; i <=2; i++){
    row.push(<AgentInfo></AgentInfo>)
  }
  return(
    row
  )
}
function AgentInfo(){
  return(
    <div>
      <img width="100" height="100" src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13262118&filePath=L2Rpc2sxL25ld2RhdGEvMjAyMC8yMS9DTFMxMDAwNi82MmZhMWExMy03ZjRmLTQ1NWMtYTZlNy02ZTk2YjhjMjBkYTk=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006" alt="someimage"></img>
      <p>Example Agent Name</p>
      <p>Example Agent Job</p>
      <p>Example Agent age</p>
      <p>Example Agent country</p>
      <button>generate opinion</button>
    </div>
    )
}
export default App;
