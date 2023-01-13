import React, { ReactElement, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { LogInfo } from "../../types";
import { formatDateTime } from "../../formatting";

export function Log(): ReactElement {
  const [data, setData] = useState<Array<LogInfo>>([]);

  console.log(data);
  console.log(data.reverse());

  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";

  useEffect(() => {
    axios
      .get("http://localhost:3001/log")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <Box my={2} mx={4}>
      {data.map((log) => (
        <Typography>
          {formatDateTime(new Date(log.dateTime))} - {log.logText}
        </Typography>
      ))}
    </Box>
  );
}
