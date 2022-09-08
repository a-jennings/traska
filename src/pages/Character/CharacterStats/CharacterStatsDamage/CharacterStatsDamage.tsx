import React, { ReactElement, useState } from "react";
import { CharacterStatistics } from "../../../../types";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type CharacterStatsDamageProps = {
  data: CharacterStatistics;
  dialogOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function CharacterStatsDamage(
  props: CharacterStatsDamageProps
): ReactElement {
  const { data, dialogOpen, onOpen, onClose } = props;

  return (
    <>
      <Button size="small" variant="outlined" color="error" onClick={onOpen}>
        Damage
      </Button>

      <Dialog open={dialogOpen} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Take Damage?</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ damage: 0 }}
            onSubmit={(values) => {
              axios
                .post("http://localhost:3001/stats", {
                  ...data,
                  hpCurrent: data.hpCurrent - values.damage,
                })
                .then(() => onClose())
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Box my={1}>
                  <TextField
                    type="number"
                    id="damage"
                    name="damage"
                    value={values.damage}
                    onChange={handleChange}
                    label="Damage"
                  />
                </Box>
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
      </Dialog>
    </>
  );
}
