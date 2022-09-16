import React, { ReactElement } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { CharacterAbilitiesList } from "../../../types";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type CharacterAbilitiesEditDialogProps = {
  data: CharacterAbilitiesList;
  onClose: () => void;
};

export function CharacterAbilitiesEditDialog(
  props: CharacterAbilitiesEditDialogProps
): ReactElement {
  const { data, onClose } = props;
  return (
    <>
      <DialogTitle>Edit Abilities</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={data}
          onSubmit={(values) => {
            axios
              .post("http://localhost:3001/abilities", values)
              .then(() => onClose())
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <Grid container spacing={1} my={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="strength"
                    name="strength"
                    label="Strength"
                    value={values.strength}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="dexterity"
                    name="dexterity"
                    label="Dexterity"
                    value={values.dexterity}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="constitution"
                    name="constitution"
                    label="Constitution"
                    value={values.constitution}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="intelligence"
                    name="intelligence"
                    label="Intelligence"
                    value={values.intelligence}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="wisdom"
                    name="wisdom"
                    label="Wisdom"
                    value={values.wisdom}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="charisma"
                    name="charisma"
                    label="Charisma"
                    value={values.charisma}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}
