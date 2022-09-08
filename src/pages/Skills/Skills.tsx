import React, { ReactElement, useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  Fab,
  Dialog,
} from "@mui/material";
import axios from "axios";
import { CharacterAbilitiesList, Skill } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { SkillsAddDialog } from "./SkillsAddDialog";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import { calcAbilityBonus } from "../../formatting";
import { SkillsEditDialog } from "./SkillsEditDialog/SkillsEditDialog";
import { SkillsDeleteDialog } from "./SkillsDeleteDialog/SkillsDeleteDialog";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Skills(): ReactElement {
  const [data, setData] = useState<Array<Skill>>();
  const [abilityData, setAbilityData] = useState<CharacterAbilitiesList>();
  const [dialogOpen, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Skill>();

  const sortedData = data?.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleEditDialogOpen = (skill: Skill) => {
    setSelected(skill);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setSelected(undefined);
    setEditDialogOpen(false);
  };
  const handleDeleteDialogOpen = (skill: Skill) => {
    setSelected(skill);
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setSelected(undefined);
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/skills")
      .then((res: { data: Array<Skill> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen, editDialogOpen, deleteDialogOpen]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/abilities")
      .then((res: { data: CharacterAbilitiesList }) => setAbilityData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen, editDialogOpen, deleteDialogOpen]);

  const getAbilityModifier = (ability: string): number => {
    if (!ability || !abilityData) {
      return 0;
    }

    if (ability === "STR") {
      return calcAbilityBonus(abilityData.strength);
    }
    if (ability === "DEX") {
      return calcAbilityBonus(abilityData.dexterity);
    }
    if (ability === "CON") {
      return calcAbilityBonus(abilityData.constitution);
    }
    if (ability === "INT") {
      return calcAbilityBonus(abilityData.intelligence);
    }
    if (ability === "WIS") {
      return calcAbilityBonus(abilityData.wisdom);
    }
    if (ability === "CHA") {
      return calcAbilityBonus(abilityData.charisma);
    }
    return 0;
  };

  if (!data || !abilityData) {
    return <></>;
  }

  return (
    <>
      <Box py={3} px={20}>
        <Grid container>
          <Grid xs={0.5} item />
          <Grid xs={5.5} item>
            <Typography>Skill Name</Typography>
          </Grid>
          <Grid xs={1} item textAlign="center">
            <Typography>Key Ability</Typography>
          </Grid>
          <Grid xs={1} item textAlign="center">
            <Typography>Skill Modifier</Typography>
          </Grid>
          <Grid xs={1} item textAlign="center">
            <Typography>Ability Modifier</Typography>
          </Grid>
          <Grid xs={1} item textAlign="center">
            <Typography>Ranks</Typography>
          </Grid>
          <Grid xs={1} item textAlign="center">
            <Typography>Misc Modifier</Typography>
          </Grid>
        </Grid>
        <Box mt={1}>
          <Divider />
        </Box>

        {sortedData?.map((skill) => (
          <Fragment key={skill.id}>
            <Grid container>
              <Grid item xs={0.5} textAlign="center">
                {skill.classSkill && (
                  <Typography sx={{ opacity: 0.7 }}>X</Typography>
                )}
              </Grid>
              <Grid xs={5.5} item display="flex" alignItems="center">
                <Typography>{skill?.name}</Typography>
                {skill?.requiresTraining && (
                  <SchoolIcon sx={{ marginLeft: 1, opacity: 0.3 }} />
                )}
              </Grid>
              <Grid xs={1} item textAlign="center">
                <Typography>{skill?.keyAbility}</Typography>
              </Grid>
              <Grid xs={1} item textAlign="center">
                <Typography>
                  {skill?.requiresTraining && !skill.classSkill
                    ? 0
                    : getAbilityModifier(skill?.keyAbility) +
                      skill?.ranks +
                      skill?.miscModifier}
                </Typography>
              </Grid>
              <Grid xs={1} item textAlign="center">
                <Typography sx={{ opacity: 0.4 }}>
                  {getAbilityModifier(skill?.keyAbility)}
                </Typography>
              </Grid>
              <Grid xs={1} item textAlign="center">
                <Typography sx={{ opacity: 0.4 }}>{skill?.ranks}</Typography>
              </Grid>
              <Grid xs={1} item textAlign="center">
                <Typography sx={{ opacity: 0.4 }}>
                  {skill?.miscModifier}
                </Typography>
              </Grid>
              <Grid
                xs={1}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  sx={{ height: "20px", width: "20px" }}
                  onClick={() => handleEditDialogOpen(skill)}
                >
                  <EditIcon
                    color="info"
                    sx={{ height: "15px", width: "15px" }}
                  />
                </IconButton>
                <IconButton
                  sx={{ height: "20px", width: "20px" }}
                  onClick={() => handleDeleteDialogOpen(skill)}
                >
                  <DeleteIcon
                    color="error"
                    sx={{ height: "20px", width: "20px" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
          </Fragment>
        ))}
        <Fab
          sx={{ position: "absolute", bottom: 30, right: 30 }}
          color="primary"
          onClick={handleDialogOpen}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <SkillsAddDialog onClose={handleDialogClose} />
      </Dialog>

      {selected && (
        <SkillsEditDialog
          skill={selected}
          dialogOpen={editDialogOpen}
          onClose={handleEditDialogClose}
        />
      )}

      {selected && (
        <SkillsDeleteDialog
          skill={selected}
          dialogOpen={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
        />
      )}
    </>
  );
}
