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
