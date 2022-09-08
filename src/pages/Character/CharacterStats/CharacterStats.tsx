import React, { ReactElement, useEffect, useState } from "react";
import { Box, Typography, Dialog, Button } from "@mui/material";
import axios from "axios";
import { CharacterStatistics } from "../../../types";
import { CharacterStatsEditDialog } from "./CharacterStatsEditDialog";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function CharacterStats(): ReactElement {
  const [data, setData] = useState<CharacterStatistics>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => [setDialogOpen(false)];

  useEffect(() => {
    axios
      .get("http://localhost:3001/stats")
      .then((res: { data: CharacterStatistics }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box minWidth="300px" maxWidth="300px" mb={1}>
        <Typography>
          HP: {data.hpCurrent}/{data.hpMax}
        </Typography>
        <Typography>AC: {data.ac}</Typography>
        <Typography>AC Touch: {data.acTouch}</Typography>
        <Typography>AC Flat Footed: {data.acFF}</Typography>
        <Typography>Speed: {data.speed}</Typography>
        <Typography>Initiative: {data.initiative}</Typography>
        <Typography>Base Attack Bonus: {data.baseAttackBonus}</Typography>
        <Typography>Grapple Modifier: {data.grapple}</Typography>
        <Typography>Spell Resistance: {data.spellResistance}</Typography>
        <Typography>Damage Reduction: {data.damageReduction}</Typography>
        <Typography>
          <strong>Saving Throws: </strong>
        </Typography>
        <Typography>Fortitude: {data.savingThrows.fortitude}</Typography>
        <Typography>Reflex: {data.savingThrows.reflex}</Typography>
        <Typography>Will: {data.savingThrows.will}</Typography>
      </Box>

      <Box>
        <Button size="small" variant="outlined" onClick={handleDialogOpen}>
          Edit
        </Button>
      </Box>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <CharacterStatsEditDialog data={data} onClose={handleDialogClose} />
      </Dialog>
    </>
  );
}
