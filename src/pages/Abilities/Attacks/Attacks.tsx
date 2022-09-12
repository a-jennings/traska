import React, { ReactElement, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { AttackData } from "../../../types";
import { Attack } from "../../../components/Abilities/Attack";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Attacks(): ReactElement {
  const [data, setData] = useState<Array<AttackData>>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/attacks")
      .then((res: { data: Array<AttackData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <></>;
  }

  console.log(data);

  return (
    <Box>
      <Grid container>
        <Grid item xs={5}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Typography>Attack Bonus</Typography>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Typography>Damage</Typography>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      {data?.map((attack) => (
        <Attack data={attack} />
      ))}
    </Box>
  );
}
