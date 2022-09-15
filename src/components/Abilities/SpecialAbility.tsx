import React, { ReactElement, useState } from "react";
import { SpecialAbilityData } from "../../types";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

type SpecialAbilityProps = {
  data: SpecialAbilityData;
  fetchSpecialAbility: () => void;
};

export function SpecialAbility(props: SpecialAbilityProps): ReactElement {
  const { data, fetchSpecialAbility } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography>{data.name}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>
              Uses: {data.currentUses}/{data.maxUses}
            </Typography>
          </Grid>
          <Grid item xs={1} textAlign="right">
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
