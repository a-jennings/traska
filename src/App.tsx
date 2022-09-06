import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const handleGet = async () => {
  axios.get("http://localhost:3001/basicInfo").then((res) => console.log(res));
};

function App() {
  return <Button onClick={handleGet}>Get</Button>;
}

export default App;
