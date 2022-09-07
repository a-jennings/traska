import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type BasicInfo = {
  name: string;
  level: number;
  class: string;
};

function App() {
  const [basicInfo, setBasicInfo] = useState<BasicInfo>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/basicInfo")
      .then((res: { data: BasicInfo }) => setBasicInfo(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box>
      <Typography>Name: {basicInfo?.name}</Typography>
      <Typography>Level: {basicInfo?.level}</Typography>
      <Typography>Class: {basicInfo?.class}</Typography>
    </Box>
  );
}

export default App;
