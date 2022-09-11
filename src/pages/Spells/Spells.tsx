import React, { ReactElement, useEffect, useState } from "react";
import { SpellHeader } from "./SpellHeader/SpellHeader";
import { SpellMenu } from "./SpellMenu/SpellMenu";
import axios from "axios";
import { SpellSlot } from "../../types";
import { Tabs, Tab, useTheme, Box } from "@mui/material";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Spells(): ReactElement {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const tabStyles = {
    backgroundColor: theme.palette.grey[300],
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box mt={2} px={4}>
        <Tabs
          variant="fullWidth"
          onChange={handleChange}
          value={activeTab}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="One" sx={tabStyles} />
          <Tab label="Two" sx={tabStyles} />
          <Tab label="Three" sx={tabStyles} />
        </Tabs>
      </Box>
    </>
  );
}
