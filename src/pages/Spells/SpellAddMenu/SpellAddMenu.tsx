import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const initialValues = {
  spellName: "",
  spellSchool: "",
  spellDescriptor: "",
  spellLevel: 0,
  spellComponents: "",
  spellCastingTime: "",
  spellRange: "",
  spellDuration: "",
  spellTarget: "",
  spellSavingThrow: "",
  spellResistance: "",
  spellArea: "",
  spellDescription: "",
  spellDescriptionTwo: "",
  spellDescriptionThree: "",
  spellDescriptionFour: "",
  spellEffect: "",
};

const levelOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type SpellAddMenuProps = {
  activeTab: Dispatch<SetStateAction<number>>;
};

export function SpellAddMenu(props: SpellAddMenuProps): ReactElement {
  const { activeTab } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <Fab
        sx={{ position: "absolute", bottom: 30, right: 30 }}
        color="primary"
        onClick={handleDialogOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={dialogOpen}
        onClose={(_, reason) => {
          if (reason === "backdropClick") {
            return;
          }
          handleDialogClose();
        }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Add Spell</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              axios
                .post("http://localhost:3001/spells", values)
                .then(() => {
                  handleDialogClose();
                  activeTab(values.spellLevel);
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container spacing={1} my={1}>
                  <Grid item xs={4}>
                    <TextField
                      id="spellName"
                      name="spellName"
                      size="small"
                      fullWidth
                      value={values.spellName}
                      onChange={handleChange}
                      label="Spell Name"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="spellSchool"
                      name="spellSchool"
                      size="small"
                      fullWidth
                      value={values.spellSchool}
                      onChange={handleChange}
                      label="Spell School"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="spellDescriptor"
                      name="spellDescriptor"
                      size="small"
                      fullWidth
                      value={values.spellDescriptor}
                      onChange={handleChange}
                      label="Spell Descriptor"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellLevel"
                      name="spellLevel"
                      size="small"
                      fullWidth
                      value={values.spellLevel}
                      onChange={handleChange}
                      label="Spell Level"
                      select
                    >
                      {levelOptions.map((level) => (
                        <MenuItem value={level}>{level}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellComponents"
                      name="spellComponents"
                      size="small"
                      fullWidth
                      value={values.spellComponents}
                      onChange={handleChange}
                      label="Spell Component"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellCastingTime"
                      name="spellCastingTime"
                      size="small"
                      fullWidth
                      value={values.spellCastingTime}
                      onChange={handleChange}
                      label="Spell Casting Time"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="spellRange"
                      name="spellRange"
                      size="small"
                      fullWidth
                      value={values.spellRange}
                      onChange={handleChange}
                      label="Spell Range"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellDuration"
                      name="spellDuration"
                      size="small"
                      fullWidth
                      value={values.spellDuration}
                      onChange={handleChange}
                      label="Spell Duration"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellTarget"
                      name="spellTarget"
                      size="small"
                      fullWidth
                      value={values.spellTarget}
                      onChange={handleChange}
                      label="Spell Target"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellSavingThrow"
                      name="spellSavingThrow"
                      size="small"
                      fullWidth
                      value={values.spellSavingThrow}
                      onChange={handleChange}
                      label="Spell Saving Throw"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellResistance"
                      name="spellResistance"
                      size="small"
                      fullWidth
                      value={values.spellResistance}
                      onChange={handleChange}
                      label="Spell Resistance"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellArea"
                      name="spellArea"
                      size="small"
                      fullWidth
                      value={values.spellArea}
                      onChange={handleChange}
                      label="Spell Area"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellEffect"
                      name="spellEffect"
                      size="small"
                      fullWidth
                      value={values.spellEffect}
                      onChange={handleChange}
                      label="Spell Effect"
                    />
                  </Grid>
                  <Grid item xs={12} my={1}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="spellDescription"
                      name="spellDescription"
                      size="small"
                      fullWidth
                      value={values.spellDescription}
                      onChange={handleChange}
                      label="Spell Description"
                      multiline
                      minRows={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="spellDescriptionTwo"
                      name="spellDescriptionTwo"
                      size="small"
                      fullWidth
                      value={values.spellDescriptionTwo}
                      onChange={handleChange}
                      label="Spell Description Two"
                      multiline
                      minRows={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="spellDescriptionThree"
                      name="spellDescriptionThree"
                      size="small"
                      fullWidth
                      value={values.spellDescriptionThree}
                      onChange={handleChange}
                      label="Spell Description Three"
                      multiline
                      minRows={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="spellDescriptionFour"
                      name="spellDescriptionFour"
                      size="small"
                      fullWidth
                      value={values.spellDescriptionFour}
                      onChange={handleChange}
                      label="Spell Description Four"
                      multiline
                      minRows={2}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button variant="outlined" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()}
                  >
                    Add Spell
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
