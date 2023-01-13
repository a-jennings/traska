import React, { ReactElement, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { LogInfo } from "../../types";

export function Log(): ReactElement {
  const [data, setData] = useState<Array<LogInfo> | null>(null);

  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";

  useEffect(() => {
    axios
      .get("http://localhost:3001/log")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <Box my={2} mx={4}>
      {data?.map((log) => (
        <Typography>{log.data}</Typography>
      ))}
    </Box>
  );
}
