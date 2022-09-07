import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Navigation } from "./components/Navigation/Navigation";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

// type BasicInfo = {
//   name: string;
//   level: number;
//   class: string;
// };

function App() {
  // const [basicInfo, setBasicInfo] = useState<BasicInfo>();
  const [selectedTab, setSelectedTab] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/basicInfo")
  //     .then((res: { data: BasicInfo }) => setBasicInfo(res.data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <>
      <Navigation selectedTab={(name) => setSelectedTab(name)} />
      {selectedTab === "Character" && <>Char!</>}
      {selectedTab === "Skills" && <>Skills!</>}
      {selectedTab === "Spells" && <>Spells!</>}
      {selectedTab === "Abilities" && <>Abilities!</>}
      {selectedTab === "Inventory" && <>Inventory!</>}
    </>
  );
}

export default App;

// seperate into sections:

// Character Info: Name, Race, Class Stats, Saving throws,
// Skills
// Spells
// Abilites - Attacks - Feats - Specials
// Inventory - Money
