import React, { useEffect } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import {QuillBinding} from 'y-quill'

function SyncText(){
    const textContainer = <div></div>
    Quill.register('modules/cursors', QuillCursors);
    
    const quill = new Quill(textContainer, {
      modules: {
        cursors: true,
        toolbar: [
          // adding some basic Quill content features
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ],
        history: {
          // Local undo shouldn't undo changes
          // from remote users
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow' // 'bubble' is also great
    })
    useEffect(()=>{
        const ydoc = new Y.Doc()
        // Define a shared text type on the document
        const ytext = ydoc.getText('quill')
        
        const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc)
        
        const binding = new QuillBinding(ytext, quill)
    })
    
    // A Yjs document holds the shared data
    return textContainer

}
export {SyncText}