import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios"
function ServerStatus() {
  const [statusText, setStatusText] = useState("Checking...");
  const [statusEmoji, setStatusEmoji] = useState("⚪️");
  useEffect(() => {
    setInterval(() => {
      const serverPromise = axios.get("/serverStatus");
      serverPromise
        .then((retVal : {status : number}) => {
          if (retVal.status >= 200 && retVal.status < 300) {
            setStatusText("Server Online");
            setStatusEmoji("🟢");
          } else {
            setStatusText("Server has error.");
            setStatusEmoji("🔴");
          }
        })
        .catch(() => {
          setStatusText("Server Offline");
          setStatusEmoji("🔴");
        });
    },5000);
  },[]);
  return (
    <div>
      <p>{statusText}</p>
      <p>{statusEmoji}</p>
    </div>
  );
}

export { ServerStatus };
