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
import { Skill } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { SkillsAddDialog } from "./SkillsAddDialog";
import SchoolIcon from "@mui/icons-material/School";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Skills(): ReactElement {
  const [data, setData] = useState<Array<Skill>>();
  const [dialogOpen, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/skills")
      .then((res: { data: Array<Skill> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box py={3} px={8}>
        <Grid container>
          <Grid xs={6} item>
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

        {data?.map((skill, i) => (
          <Fragment key={i}>
            <Grid container>
              <Grid xs={6} item display="flex" alignItems="center">
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
                  {skill?.requiresTraining
                    ? 0
                    : skill?.abilityModifier +
                      skill?.ranks +
                      skill?.miscModifier}
                </Typography>
              </Grid>
              <Grid xs={1} item textAlign="center">
                <Typography sx={{ opacity: 0.4 }}>
                  {skill?.abilityModifier}
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
                <IconButton sx={{ height: "20px", width: "20px" }}>
                  <EditIcon sx={{ height: "20px", width: "20px" }} />
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
    </>
  );
}
