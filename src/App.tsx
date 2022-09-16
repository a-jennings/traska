import React, { useState } from "react";
import { Navigation } from "./components/Navigation/Navigation";
import { Character } from "./pages/Character/Character";
import { Inventory } from "./pages/Inventory/Inventory";
import { Skills } from "./pages/Skills/Skills";
import { Spells } from "./pages/Spells/Spells";
import { Abilities } from "./pages/Abilities/Abilities";
import { WorldMap } from "./pages/WorldMap/WorldMap";
import { Notes } from "./pages/Notes/Notes";

function App() {
  const [selectedTab, setSelectedTab] = useState("Character");

  return (
    <>
      <Navigation selectedTab={(name) => setSelectedTab(name)} />
      {selectedTab === "Character" && <Character />}
      {selectedTab === "Skills" && <Skills />}
      {selectedTab === "Spells" && <Spells />}
      {selectedTab === "Abilities" && <Abilities />}
      {selectedTab === "Inventory" && <Inventory />}
      {selectedTab === "World Map" && <WorldMap />}
      {selectedTab === "Notes" && <Notes />}
    </>
  );
}

export default App;
