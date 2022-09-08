import React, { ReactElement, useEffect, useState } from "react";
import { Box, Typography, Dialog, Button } from "@mui/material";
import axios from "axios";
import { CharacterStatistics } from "../../../types";
import { CharacterStatsEditDialog } from "./CharacterStatsEditDialog";
import { CharacterStatsDamage } from "./CharacterStatsDamage/CharacterStatsDamage";
import { CharacterStatsHeal } from "./CharacterStatsHeal/CharacterStatsHeal";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function CharacterStats(): ReactElement {
  const [data, setData] = useState<CharacterStatistics>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [damageDialogOpen, setDamageDialogOpen] = useState(false);
  const [healDialogOpen, setHealDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => setDialogOpen(false);

  const handleDamageDialogOpen = () => setDamageDialogOpen(true);

  const handleDamageDialogClose = () => setDamageDialogOpen(false);

  const handleHealDialogOpen = () => setHealDialogOpen(true);

  const handleHealDialogClose = () => setHealDialogOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/stats")
      .then((res: { data: CharacterStatistics }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen, damageDialogOpen, healDialogOpen]);

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

      <Box display="flex" alignItems="center">
        <Button size="small" variant="outlined" onClick={handleDialogOpen}>
          Edit
        </Button>
        <Box ml={1}>
          <CharacterStatsDamage
            data={data}
            dialogOpen={damageDialogOpen}
            onOpen={handleDamageDialogOpen}
            onClose={handleDamageDialogClose}
          />
        </Box>
        <Box ml={1}>
          <CharacterStatsHeal
            data={data}
            dialogOpen={healDialogOpen}
            onOpen={handleHealDialogOpen}
            onClose={handleHealDialogClose}
          />
        </Box>
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
