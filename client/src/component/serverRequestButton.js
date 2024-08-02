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


    return <button onClick={makeRequest} disabled={isRequestProceed}>{isRequestProceed? proceedText: requestText}</button>
}

export {RequestButton}