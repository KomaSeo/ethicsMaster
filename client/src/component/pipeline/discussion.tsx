import * as React from "react";
import { useState } from "react";

function DiscussionPanel(){
    const [review,SetReview] = useState<string>("")
    return (<div>
        <textarea rows={15} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={review} onChange={event=>SetReview(event.target.value)}></textarea>
        </div>)
}
//TODO make student to write their own discuss.