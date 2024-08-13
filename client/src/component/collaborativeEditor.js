import React, { useEffect, useRef, useState } from 'react';
import Editor from './editor';
import Quill from 'quill';
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';

const Delta = Quill.import('delta');

const CollaborativeEditor = ({roomName, docName}) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  useEffect(()=>{
    const ydoc = new Y.Doc()
    const wsProvider = new WebsocketProvider('ws://localhost:1234', roomName,ydoc)
    wsProvider.on('status',event=>{
        console.log(event.status)
    })
    const ytext = ydoc.getText(docName)
    const binding = new QuillBinding(ytext, quillRef.current)
  },[])
  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
      <div class="controls">
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
      </div>
      <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : 'Empty'}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
      </div>
    </div>
  );
};

export default CollaborativeEditor;