import * as React from "react";
import  { useState } from "react";
import { RequestButton } from "../UI/serverRequestButton.js";
import { Persona } from "./persona.js";
import { Product } from "./product.js";
function ReveiwPanel({persona, product, stance, evaluationStandard} : {persona : Persona | undefined, product : Product | undefined, stance : string | undefined, evaluationStandard : string | undefined}){
    const [review, SetReview] = useState<string>("");
    const reviewParam = {
        params : {
            product : product,
            persona : persona,
            stance : stance,
            evaluationStandard : evaluationStandard
        }
    }
    function handleReviewChange(review : string){
        SetReview(review)
    }
    return(<div>
        <textarea rows={15} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={review} onChange={event=>SetReview(event.target.value)}></textarea>
        <RequestButton requestText="generate review" proceedText="generating..." url={"/review"} config={reviewParam} onRequest={(retVal : {data : string})=>{handleReviewChange(retVal.data)}}></RequestButton>
    </div>)
}
export {ReveiwPanel}