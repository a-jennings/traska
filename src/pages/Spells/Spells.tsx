import React, { ReactElement, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab, useTheme, Box } from "@mui/material";
import { SpellAddMenu } from "./SpellAddMenu/SpellAddMenu";
import { SpellData, SpellSlotData } from "../../types";
import { Spell } from "../../components/Spell";
import { SpellHeader } from "./SpellHeader/SpellHeader";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Spells(): ReactElement {
  const [data, setData] = useState<Array<SpellData>>();
  const [slotData, setSlotData] = useState<SpellSlotData>();
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

  const fetchSpellSlots = useCallback(() => {
    axios
      .get("http://localhost:3001/spellSlots")
      .then((res: { data: SpellSlotData }) => {
        setSlotData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filterSpellData =
    data?.filter((spell) => spell.spellLevel === activeTab) || [];

  const sortSpells = (data: Array<SpellData>) => {
    const preparedSpells = data
      .filter((spell) => spell.spellPrepared > 0)
      .sort((a, b) =>
        a.spellName > b.spellName ? 1 : b.spellName > a.spellName ? -1 : 0
      );

    const domainSpells = data
      .filter((spell) => spell.spellDomainSpell && !spell.spellPrepared)
      .sort((a, b) =>
        a.spellName > b.spellName ? 1 : b.spellName > a.spellName ? -1 : 0
      );

    const otherSpells = data
      .filter((spell) => spell.spellPrepared <= 0 && !spell.spellDomainSpell)
      .sort((a, b) =>
        a.spellName > b.spellName ? 1 : b.spellName > a.spellName ? -1 : 0
      );

    return preparedSpells.concat(domainSpells).concat(otherSpells);
  };

  const sortedFilteredSpells = sortSpells(filterSpellData);

  useEffect(() => {
    axios
      .get("http://localhost:3001/spells")
      .then((res: { data: Array<SpellData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [activeTab, fetchSpells]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/spellSlots")
      .then((res: { data: SpellSlotData }) => {
        setSlotData(res.data);
      })
      .catch((error) => console.log(error));
  }, [fetchSpellSlots]);

  if (!data || !slotData) {
    return <></>;
  }

  return (
    <>
      <Box mt={2} px={4}>
        <SpellHeader fetchSpells={fetchSpellSlots} />

        <Tabs
          variant="fullWidth"
          onChange={handleChange}
          value={activeTab}
          indicatorColor="secondary"
          textColor="secondary"
          sx={{ marginBottom: 2 }}
        >
          {slotData.zero > 0 && <Tab label="Zero" sx={tabStyles} />}
          {slotData.one > 0 && <Tab label="One" sx={tabStyles} />}
          {slotData.two > 0 && <Tab label="Two" sx={tabStyles} />}
          {slotData.three > 0 && <Tab label="Three" sx={tabStyles} />}
          {slotData.four > 0 && <Tab label="Four" sx={tabStyles} />}
          {slotData.five > 0 && <Tab label="Five" sx={tabStyles} />}
          {slotData.six > 0 && <Tab label="Six" sx={tabStyles} />}
          {slotData.seven > 0 && <Tab label="Seven" sx={tabStyles} />}
          {slotData.eight > 0 && <Tab label="Eight" sx={tabStyles} />}
          {slotData.nine > 0 && <Tab label="Nine" sx={tabStyles} />}
        </Tabs>

        <SpellAddMenu fetchSpells={fetchSpells} />
        <Box>
          {sortedFilteredSpells.map((spell, i) => (
            <Spell key={i} data={spell} fetchSpells={fetchSpells} />
          ))}
        </Box>
      </Box>
    </>
  );
}
