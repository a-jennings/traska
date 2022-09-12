import React, { ReactElement, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab, useTheme, Box } from "@mui/material";
import { SpellAddMenu } from "./SpellAddMenu/SpellAddMenu";
import { SpellData } from "../../types";
import { Spell } from "../../components/Spell";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Spells(): ReactElement {
  const [data, setData] = useState<Array<SpellData>>();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const tabStyles = {
    backgroundColor: theme.palette.grey[300],
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const fetchSpells = useCallback(() => {
    axios
      .get("http://localhost:3001/spells")
      .then((res: { data: Array<SpellData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  const filterSpellData = data?.filter(
    (spell) => spell.spellLevel === activeTab
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/spells")
      .then((res: { data: Array<SpellData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [activeTab, fetchSpells]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box mt={2} px={4}>
        <Tabs
          variant="fullWidth"
          onChange={handleChange}
          value={activeTab}
          indicatorColor="secondary"
          textColor="secondary"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Zero" sx={tabStyles} />
          <Tab label="One" sx={tabStyles} />
          <Tab label="Two" sx={tabStyles} />
          <Tab label="Three" sx={tabStyles} />
        </Tabs>

        <SpellAddMenu fetchSpells={fetchSpells} />
        <Box>
          {filterSpellData?.map((spell, i) => (
            <Spell key={i} data={spell} fetchSpells={fetchSpells} />
          ))}
        </Box>
      </Box>
    </>
  );
}
