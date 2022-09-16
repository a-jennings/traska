import React, { ReactElement, useState } from "react";
import { Tabs, Tab } from "@mui/material";

type NavigationProps = {
  selectedTab: (name: string) => void;
};

export function Navigation(props: NavigationProps): ReactElement {
  const tabList = [
    "Character",
    "Skills",
    "Spells",
    "Abilities",
    "Inventory",
    "World Map",
  ];
  const [currentTab, setCurrentTab] = useState("Character");

  return (
    <Tabs value={currentTab}>
      {tabList.map((tab, i) => (
        <Tab
          key={i}
          value={tab}
          label={tab}
          onClick={() => {
            setCurrentTab(tab);
            props.selectedTab(tab);
          }}
        />
      ))}
    </Tabs>
  );
}
