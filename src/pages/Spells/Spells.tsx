import React, { ReactElement, useEffect, useState } from "react";
import { SpellHeader } from "./SpellHeader/SpellHeader";
import { SpellMenu } from "./SpellMenu/SpellMenu";
import axios from "axios";
import { SpellSlot } from "../../types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Spells(): ReactElement {
  const [data, setData] = useState<Array<SpellSlot>>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/spellSlots")
      .then((res: { data: Array<SpellSlot> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <SpellHeader data={data} setData={setData} />
      <SpellMenu data={data} setData={setData} />
    </>
  );
}
