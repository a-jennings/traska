import React, { ReactElement, useState } from "react";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/material";
import { stateToHTML } from "draft-js-export-html";

type TextEditorProps = {
  onChange: (editorHTML: string) => void;
  initialValue: string;
};

export function TextEditor(props: TextEditorProps): ReactElement {
  const convertedHTML = convertFromHTML(props.initialValue);
  const contentState = ContentState.createFromBlockArray(
    convertedHTML.contentBlocks,
    convertedHTML.entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  return (
    <>
      <Box
        sx={{
          ".wrapper": {
            boxShadow: 1,
            padding: 2,
            minHeight: "200px",
          },
          ".editor *": {
            fontFamily: "Arial",
          },
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={(value) => {
            setEditorState(value);
            props.onChange(stateToHTML(editorState.getCurrentContent()));
          }}
          wrapperClassName="wrapper"
          editorClassName="editor"
          placeholder="Start typing..."
          toolbar={{
            options: ["inline", "list"],
            inline: {
              options: ["bold", "italic", "underline"],
            },
          }}
        />
      </Box>
    </>
  );
}
