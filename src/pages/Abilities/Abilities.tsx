import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { Attacks } from "./Attacks/Attacks";
import { Gear } from "./Gear/Gear";
import { Feats } from "./Feats/Feats";
import { Languages } from "./Languages/Languages";

export function Abilities(): ReactElement {
  return (
    <Box py={3} px={20}>
      <Attacks />
      <Gear />
      <Feats />
      <Languages />
    </Box>
  );
}

// Special Abilities
// Feats
// Languages
