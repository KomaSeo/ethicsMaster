import React, { useEffect, useRef, useState } from "react";
import Editor from "./editor";
import Quill from "quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import { useSelector } from "react-redux";

const Delta = Quill.import("delta");

const CollaborativeEditor = ({ docName, placeholder, onTextChange, value }) => {
  const roomId = useSelector((state) => state.judgementCallRoom.roomId);
  const userId = useSelector((state) => state.judgementCallRoom.userId);
  const isInitialize = useRef(false);
  const textRef = useRef(undefined);
  const [range, setRange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  // Use a ref to access the quill instance directly
  const quillRef = useRef();
  function handleTextChange({ text }) {
    onTextChange(text);
  }

  useEffect(() => {
    if (roomId != 0 && userId != 0 && !isInitialize.current) {
      console.log(`Initialize connect with room id ${roomId}`);
      const ydoc = new Y.Doc();
      const wsProvider = new WebsocketProvider(
        "ws://localhost:1234",
        roomId,
        ydoc
      );
      /*
      wsProvider.on("status", (event) => {
        console.log(event.status);
      });*/
      const ytext = ydoc.getText(docName);
      const binding = new QuillBinding(ytext, quillRef.current);
      textRef.current = ytext;
      quillRef.placeholder = placeholder;
      isInitialize.current = true;
    }
  }, [roomId]);
  useEffect(() => {
    if (textRef && value) {
      const ytext = textRef.current;
      ytext.delete(0, ytext.length);
      textRef.current.insert(0, value);
    }
  }, [value]);
  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta().insert("Loading...")}
        onSelectionChange={setRange}
        onTextChange={handleTextChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CollaborativeEditor;
