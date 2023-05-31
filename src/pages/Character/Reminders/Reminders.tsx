import React, { ReactElement } from "react";
import { Typography } from "@mui/material";

export function Reminders(): ReactElement {
  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 8 }}>
        Reminders
      </Typography>
      <Typography>2 attacks! Base attack is +6/+1</Typography>
      <Typography>
        50% miss chance from all ranged attacks with Ring of Entropic Deflection
      </Typography>
      <Typography>
        +3 on Charisma based checks (including Turn Undead)
      </Typography>
      <Typography>Immune to all disease</Typography>
      <Typography>
        All allies within 10 feet of him gain a +2 morale bonus on all Will
        saving throws.
      </Typography>
      <Typography>
        Casting healing domain spells adds 1/2 dice from Empower Feat
      </Typography>
      <Typography>Acid, cold, and electricity resistance 5.</Typography>
      <Typography>+1 on Diplomacy checks when invoking Pelor</Typography>
    </>
  );
}
