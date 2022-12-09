import React, { ReactElement, useState } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const levelOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type SpellAddMenuProps = {
  fetchSpells: () => void;
  currentLevelSelected: number;
};

export function SpellAddMenu(props: SpellAddMenuProps): ReactElement {
  const { fetchSpells, currentLevelSelected } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const initialValues = {
    spellName: "",
    spellSchool: "",
    spellDescriptor: "",
    spellLevel: currentLevelSelected,
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
    spellDomainSpell: false,
    spellPrepared: 0,
    spellMaterial: "",
  };

  return (
    <>
      <Fab
        sx={{ position: "absolute", top: 5, right: 30 }}
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
                  fetchSpells();
                  handleDialogClose();
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
                      {levelOptions.map((level, i) => (
                        <MenuItem key={i} value={level}>
                          {level}
                        </MenuItem>
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
                  <Grid item xs={4}>
                    <TextField
                      id="spellPrepared"
                      name="spellPrepared"
                      size="small"
                      fullWidth
                      value={values.spellPrepared}
                      onChange={handleChange}
                      label="Spell Prepared"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.spellDomainSpell}
                          onChange={handleChange}
                          id="spellDomainSpell"
                          name="spellDomainSpell"
                        />
                      }
                      label="Domain Spell?"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellMaterial"
                      name="spellMaterial"
                      size="small"
                      fullWidth
                      value={values.spellMaterial}
                      onChange={handleChange}
                      label="Spell Material"
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
