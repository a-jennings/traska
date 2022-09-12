import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { Attacks } from "./Attacks/Attacks";
import { Gear } from "./Gear/Gear";
import { Feats } from "./Feats/Feats";

export function Abilities(): ReactElement {
  return (
    <Box py={3} px={20}>
      <Attacks />
      <Gear />
      <Feats />
    </Box>
  );
}

// Special Abilities
// Feats
// Languages
