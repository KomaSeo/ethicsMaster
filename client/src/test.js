import React from 'react'
import ReactDom from 'react-dom'
import {createBrowserRouter, RouterProvider, useLoaderData} from 'react-router-dom'


const router = createBrowserRouter([
    {
        path:"/",
        element : <div>Default route</div>
    },{
        path:"/:paramId",
        loader: async ({params})=>{
            return params.paramId
        },
        element : <ExampleParam></ExampleParam>
    }
])
function ExampleParam(){
    const paramId = useLoaderData()
    return (<div>{paramId}</div>)
}
function Test(){
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}
export default Test