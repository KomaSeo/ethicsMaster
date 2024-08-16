import "./App.css";
import LoginPage from "./component/connection/login.js";
import Room from "./component/connection/room.js";
import JudgementCall from "./component/judgementCallRoom.js";
import {createBrowserRouter, redirect, RouterProvider, useLoaderData} from 'react-router-dom'

const router = createBrowserRouter([
  {
      path:"/",
      loader: async({request})=>{
        const url = new URL(request.url);
        const studentId = url.searchParams.get("studentId");
        if(studentId){
          return redirect(`/${studentId}`);
        }
        else{
          return {}
        }
      },
      element : <LoginPage />
  },{
    path:"/:userId",
    loader: async ({params})=>{
      return {userId : params.userId}
    },
    element : <Room/>
  },{
      path:"/:userId/:roomId",
      loader: async ({params})=>{
          return {userId : params.userId, roomId : params.roomId}
      },
      element : <JudgementCall></JudgementCall>
  }
])
function ExampleParam(){
  const paramId = useLoaderData()
  return (<div>{paramId}</div>)
}

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
