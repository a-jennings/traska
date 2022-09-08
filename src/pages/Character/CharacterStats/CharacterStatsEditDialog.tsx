import React, { ReactElement } from "react";
import { CharacterStatistics } from "../../../types";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type CharacterStatsEditDialogProps = {
  data: CharacterStatistics;
  onClose: () => void;
};

export function CharacterStatsEditDialog(
  props: CharacterStatsEditDialogProps
): ReactElement {
  const { data, onClose } = props;

  return (
    <>
      <DialogTitle>Edit Stats</DialogTitle>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          axios
            .post("http://localhost:3001/stats", values)
            .then(() => onClose())
            .catch((error) => console.log(error));
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <DialogContent>
            <Form>
              <Grid container spacing={1} my={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="hpCurrent"
                    name="hpCurrent"
                    label="Current HP"
                    value={values.hpCurrent}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="hpMax"
                    name="hpMax"
                    label="Max HP"
                    value={values.hpMax}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="ac"
                    name="ac"
                    label="AC"
                    value={values.ac}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="acTouch"
                    name="acTouch"
                    label="AC Touch"
                    value={values.acTouch}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="acFF"
                    name="acFF"
                    label="AC Flat Footed"
                    value={values.acFF}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="speed"
                    name="speed"
                    label="Speed"
                    value={values.speed}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="initiative"
                    name="initiative"
                    label="Initiative"
                    value={values.initiative}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="baseAttackBonus"
                    name="baseAttackBonus"
                    label="Base Attack Bonus"
                    value={values.baseAttackBonus}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="grapple"
                    name="grapple"
                    label="Grapple Modifier"
                    value={values.grapple}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="spellResistance"
                    name="spellResistance"
                    label="Spell Resistance"
                    value={values.spellResistance}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="damageReduction"
                    name="damageReduction"
                    label="Damage Reduction"
                    value={values.damageReduction}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="savingThrows.fortitude"
                    name="savingThrows.fortitude"
                    label="Fortitude"
                    value={values.savingThrows.fortitude}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="savingThrows.reflex"
                    name="savingThrows.reflex"
                    label="Reflex"
                    value={values.savingThrows.reflex}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="savingThrows.will"
                    name="savingThrows.will"
                    label="Will"
                    value={values.savingThrows.will}
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
          </DialogContent>
        )}
      </Formik>
    </>
  );
}
