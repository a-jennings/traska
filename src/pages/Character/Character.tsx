import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { CharacterData } from "../../types";
import { Box, Typography } from "@mui/material";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Character(): ReactElement {
  const [data, setData] = useState<CharacterData>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/basicInfo")
      .then((res: { data: CharacterData }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box>
      <Typography>Name: {data?.name}</Typography>
      <Typography>Class:</Typography>
      {data?.classes.map((cl) => (
        <Typography>
          {cl.class} {cl.level}
        </Typography>
      ))}
    </Box>
  );
}
