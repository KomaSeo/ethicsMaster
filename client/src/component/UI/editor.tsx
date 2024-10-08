import * as React from "react";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "./editor.css";
import { Delta, EmitterSource, Range } from "quill/core";

// Editor is an uncontrolled React component
const Editor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
      placeholder,
    }: {
      readOnly: boolean;
      defaultValue: Delta;
      onTextChange: ({ text }: { text: string }) => void;
      onSelectionChange?: (
        range: Range,
        oldContent: Range,
        source: EmitterSource
      ) => void;
      placeholder: string | undefined;
    },
    ref? : React.ForwardedRef<Quill> 
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (typeof ref !== "function") {
        ref?.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement("div")
        );
        const quill = new Quill(editorContainer, {
          modules: { toolbar: false },
          placeholder: placeholder,
          theme: "snow",
        });
        if (typeof ref !== "function" && ref) {
          ref.current = quill;
        }

        if (defaultValueRef.current) {
          quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          onTextChangeRef.current?.({ ...args, text: quill.getText() });
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          onSelectionChangeRef.current?.(...args);
        });
      }

      return () => {
        if (ref && typeof ref !== "function") {
          ref.current = null;
        }
        if (container) {
          container.innerHTML = "";
        }
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;
