import React, { ReactElement } from "react";
import { SpellHeader } from "./SpellHeader/SpellHeader";
import { SpellMenu } from "./SpellMenu/SpellMenu";

export function Spells(): ReactElement {
  return (
    <>
      <SpellHeader />
      <SpellMenu />
    </>
  );
}
