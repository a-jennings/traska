import React, { ReactElement } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import axios from "axios";
import { Skill } from "../../../types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SkillsEditDialogProps = {
  skill: Skill;
  dialogOpen: boolean;
  onClose: () => void;
};

export function SkillsEditDialog(props: SkillsEditDialogProps): ReactElement {
  const { skill, dialogOpen, onClose } = props;

  return (
    <Dialog open={dialogOpen} onClose={onClose}>
      <DialogTitle>Edit {skill.name}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={skill}
          onSubmit={(values) => {
            axios
              .patch(`http://localhost:3001/skills/${skill.id}`, values)
              .then(() => onClose())
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <Form>
              <Grid container spacing={1} my={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="name"
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="keyAbility"
                    name="keyAbility"
                    label="Ability"
                    value={values.keyAbility}
                    onChange={handleChange}
                    select
                  >
                    <MenuItem value="STR">STR</MenuItem>
                    <MenuItem value="DEX">DEX</MenuItem>
                    <MenuItem value="CON">CON</MenuItem>
                    <MenuItem value="INT">INT</MenuItem>
                    <MenuItem value="WIS">WIS</MenuItem>
                    <MenuItem value="CHA">CHA</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="ranks"
                    name="ranks"
                    label="Ranks"
                    value={values.ranks}
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="miscModifier"
                    name="miscModifier"
                    label="Misc Modifier"
                    value={values.miscModifier}
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <FormControlLabel
                    id="classSkill"
                    name="classSkill"
                    value={values.classSkill}
                    onChange={handleChange}
                    labelPlacement="start"
                    control={<Checkbox />}
                    label="Class Skill"
                  />
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <FormControlLabel
                    id="requiresTraining"
                    name="requiresTraining"
                    value={values.requiresTraining}
                    onChange={handleChange}
                    labelPlacement="start"
                    control={<Checkbox />}
                    label="Training Required"
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
