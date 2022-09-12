import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { Attacks } from "./Attacks/Attacks";

export function Abilities(): ReactElement {
  return (
    <Box py={3} px={10}>
      <Typography fontSize={18}>Attacks</Typography>
      <Attacks />
    </Box>
  );
}

// Attacks
// Gear (Protective)
// Special Abilities
// Feats
// Languages
