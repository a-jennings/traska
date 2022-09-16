import React, { ReactElement, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { TextEditor } from "../../components/TextEditor/TextEditor";

export function Notes(): ReactElement {
  return (
    <>
      <TextEditor onChange={(htmlText) => console.log(htmlText)} />
      <Button>Publish</Button>
    </>
  );
}
