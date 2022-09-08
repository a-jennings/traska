import React, { ReactElement } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const initialValues = {
  name: "",
  keyAbility: "",
  abilityModifier: 0,
  ranks: 0,
  miscModifier: 0,
  classSkill: false,
  requiresTraining: false,
};

type SkillsAddDialogProps = {
  onClose: () => void;
};

export function SkillsAddDialog(props: SkillsAddDialogProps): ReactElement {
  const { onClose } = props;

  return (
    <>
      <DialogTitle>Add Skill</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            axios
              .post("http://localhost:3001/skills", values)
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
                    id="abilityModifier"
                    name="abilityModifier"
                    label="Ability Modifier"
                    value={values.abilityModifier}
                    type="number"
                    onChange={handleChange}
                  />
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
                <Grid
                  item
                  xs={6}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
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
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
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
    </>
  );
}
