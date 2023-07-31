import React, { ReactElement } from "react";
import { Typography, Box, Grid, useTheme } from "@mui/material";

export function Reminders(): ReactElement {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h5"
        style={{ marginBottom: 8, textDecoration: "underline" }}
      >
        Reminders
      </Typography>
      {/* OLD */}
      {/* <Box>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography>2 attacks! Base attack is +6/+1</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              50% miss chance from all ranged attacks with Ring of Entropic
              Deflection
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              +3 on Charisma based checks (including Turn Undead)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Immune to all disease</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              All allies within 10 feet of him gain a +2 morale bonus on all
              Will saving throws.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Casting healing domain spells adds 1/2 dice from Empower Feat
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Acid, cold, and electricity resistance 5.</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>+1 on Diplomacy checks when invoking Pelor</Typography>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
}
