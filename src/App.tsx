import React, { useState } from "react";
import { Navigation } from "./components/Navigation/Navigation";
import { Character } from "./pages/Character/Character";

function App() {
  const [selectedTab, setSelectedTab] = useState("Character");

  return (
    <>
      <Navigation selectedTab={(name) => setSelectedTab(name)} />
      {selectedTab === "Character" && <Character />}
      {selectedTab === "Skills" && <>Skills!</>}
      {selectedTab === "Spells" && <>Spells!</>}
      {selectedTab === "Abilities" && <>Abilities!</>}
      {selectedTab === "Inventory" && <>Inventory!</>}
    </>
  );
}

export default App;
