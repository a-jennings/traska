import React, { ReactElement, useEffect, useState } from "react";
import { Box, Typography, Grid, Divider, Button, Dialog } from "@mui/material";
import { calcAbilityBonus, styleAbilityBonus } from "../../../formatting";
import axios from "axios";
import { CharacterAbilitiesList } from "../../../types";
import { CharacterAbilitiesEditDialog } from "./CharacterAbilitiesEditDialog";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function CharacterAbilities(): ReactElement {
  const [data, setData] = useState<CharacterAbilitiesList>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/abilities")
      .then((res: { data: CharacterAbilitiesList }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box minWidth="300px" maxWidth="300px" mr={10}>
        <Grid container>
          <Grid item xs={8}>
            <Typography>Ability Name</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>Score</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>Bonus</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={8}>
            <Typography>Strength</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>{data.strength}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>
              {styleAbilityBonus(calcAbilityBonus(data.strength))}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography>Dexterity</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>{data.dexterity}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>
              {styleAbilityBonus(calcAbilityBonus(data.dexterity))}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography>Constitution</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>{data.constitution}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>
              {styleAbilityBonus(calcAbilityBonus(data.constitution))}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography>Intelligence</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>{data.intelligence}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>
              {styleAbilityBonus(calcAbilityBonus(data.intelligence))}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography>Wisdom</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>{data.wisdom}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>
              {styleAbilityBonus(calcAbilityBonus(data.wisdom))}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography>Charisma (+3)</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>{data.charisma}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography>
              {styleAbilityBonus(calcAbilityBonus(data.charisma) + 3)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mt={1}>
        <Button variant="outlined" onClick={handleDialogOpen} size="small">
          Edit
        </Button>
      </Box>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <CharacterAbilitiesEditDialog data={data} onClose={handleDialogClose} />
      </Dialog>
    </>
  );
}
