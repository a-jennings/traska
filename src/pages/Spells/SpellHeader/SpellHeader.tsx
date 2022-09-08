import React, { ReactElement, useState, useEffect, Fragment } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { SpellSlot } from "../../../types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function SpellHeader(): ReactElement {
  const [data, setData] = useState<Array<SpellSlot>>();

  const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    axios
      .get("http://localhost:3001/spellSlots")
      .then((res: { data: Array<SpellSlot> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <Box
      width="100%"
      bgcolor="gray"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      {levels.map((level, index) => (
        <Fragment key={index}>
          <Box>
            <Typography>Level: {level}</Typography>
          </Box>
          <Box>
            <Typography>
              Slots: {data[level].currentSlots} / {data[level].maxSlots}
            </Typography>
          </Box>
        </Fragment>
      ))}
    </Box>
  );
}
