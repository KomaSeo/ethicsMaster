import React, { useState } from "react";
import axios from "axios";

function RequestButton({requestText = "request", proceedText = "requesting...", url, config, onRequest}){
    const [isRequestProceed , setIsRequestProceed] = useState(false);
    function makeRequest(){
        setIsRequestProceed(true);
        const requestPromise = axios.get(url,config);
        requestPromise.then(onRequest).catch(e=>{
            console.warn(`request for ${url} failed. config : ${JSON.stringify(config)}`);
            console.warn(e.message)
        }).finally(()=>{
            setIsRequestProceed(false);
        })
    }


    return <button onClick={makeRequest} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled={isRequestProceed}>{isRequestProceed? proceedText: requestText}</button>
}

export {RequestButton}