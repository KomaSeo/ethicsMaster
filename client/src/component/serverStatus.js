
import { useEffect, useState } from 'react';
import axios from 'axios'
function ServerStatus(){
    const [statusText, setStatusText] = useState('Checking...');
    const [statusEmoji, setStatusEmoji] = useState('⚪️')
    useEffect(()=>{
      const serverPromise = axios.get("/serverStatus")
      serverPromise.then((retVal)=>{
        if(retVal.status >=200 && retVal.status < 300){
          setStatusText('Server Online');
          setStatusEmoji('🟢');
        }
        else{
          setStatusText('Server has error.');
          setStatusEmoji('🔴')
        }
      }).catch(()=>{
        setStatusText('Server Offline');
        setStatusEmoji('🔴')
      })
    })
    return (
      <div>
        <p>{statusText}</p>
        <p>{statusEmoji}</p>
      </div>
    )
  }

export {ServerStatus};