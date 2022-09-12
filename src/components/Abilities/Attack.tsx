import React, { ReactElement } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { AttackData } from "../../types";

type AttackProps = {
  data: AttackData;
};

export function Attack(props: AttackProps): ReactElement {
  const { data } = props;
  return (
    <Box>
      <Grid container>
        <Grid item xs={5}>
          <Typography>{data.name}</Typography>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Typography>{data.bonus}</Typography>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Typography>{data.damage}</Typography>
        </Grid>
        <Grid item xs={1}>
          Expander
        </Grid>
      </Grid>
    </Box>
  );
}
