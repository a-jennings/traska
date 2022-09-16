import React, { ReactElement } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";
import { CharacterData } from "../../types";
import axios from "axios";

type EditCharacterDialogProps = {
  onClose: () => void;
  data: CharacterData;
};

export function EditCharacterDialog(
  props: EditCharacterDialogProps
): ReactElement {
  const { onClose, data } = props;

  return (
    <>
      <DialogTitle>Edit Character</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={data}
          onSubmit={(values) => {
            axios.post("http://localhost:3001/character", values).then(() => {
              onClose();
            });
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
                    id="race"
                    name="race"
                    label="Race"
                    value={values.race}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="alignment"
                    name="alignment"
                    label="Alignment"
                    value={values.alignment}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="deity"
                    name="deity"
                    label="Deity"
                    value={values.deity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="size"
                    name="size"
                    label="Size"
                    value={values.size}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="age"
                    name="age"
                    label="Age"
                    value={values.age}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="gender"
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="height"
                    name="height"
                    label="Height"
                    value={values.height}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="weight"
                    name="weight"
                    label="Weight"
                    value={values.weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="eyes"
                    name="eyes"
                    label="Eyes"
                    value={values.eyes}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="hair"
                    name="hair"
                    label="Hair"
                    value={values.hair}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="skin"
                    name="skin"
                    label="Skin"
                    value={values.skin}
                    onChange={handleChange}
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
