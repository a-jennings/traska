import React, { ReactElement } from "react";
import { Box } from "@mui/material";

export function WorldMap(): ReactElement {
  return (
    <Box p={2}>
      <img width="100%" src={"./Traska.png"} alt="world-map" />
    </Box>
  );
}
