import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Editor from "./editor";
import Quill, { EmitterSource, Range } from "quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const Delta = Quill.import("delta");

const CollaborativeEditor = ({
  docName,
  placeholder,
  onTextChange,
  value,
}: {
  docName: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  value: string;
}) => {
  const roomId = useSelector(
    (state: RootState) => state.RoomSlice.roomId
  );
  const userId = useSelector(
    (state: RootState) => state.RoomSlice.userId
  );
  const isInitialize = useRef(false);
  const textRef = useRef<Y.Text>();
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef<Quill>(null);
  function handleTextChange({ text }: { text: string }) {
    onTextChange(text);
  }

  useEffect(() => {
    if (roomId != 0 && userId != 0 && !isInitialize.current) {
      console.log(`Initialize connect with room id ${roomId}`);
      const ydoc = new Y.Doc();
      const wsProvider = new WebsocketProvider(
        "ws://localhost:1234",
        roomId.toString(),
        ydoc
      );
      /*
      wsProvider.on("status", (event) => {
        console.log(event.status);
      });*/
      const ytext = ydoc.getText(docName);
      const binding = new QuillBinding(ytext, quillRef.current);
      textRef.current = ytext;
      isInitialize.current = true;
    }
  }, [roomId]);
  useEffect(() => {
    if (textRef && value) {
      const ytext = textRef.current;
      ytext?.delete(0, ytext.length);
      textRef.current?.insert(0, value);
    }
  }, [value]);
  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta().insert("Loading...")}
        onTextChange={handleTextChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CollaborativeEditor;
