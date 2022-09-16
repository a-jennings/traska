import React, { ReactElement } from "react";
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

type CharacterStatsHealProps = {
  data: CharacterStatistics;
  dialogOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function CharacterStatsHeal(
  props: CharacterStatsHealProps
): ReactElement {
  const { data, dialogOpen, onOpen, onClose } = props;

  return (
    <>
      <Button size="small" variant="outlined" color="success" onClick={onOpen}>
        Heal
      </Button>

      <Dialog open={dialogOpen} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Heal Damage</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ healing: 0 }}
            onSubmit={(values) => {
              axios
                .post("http://localhost:3001/stats", {
                  ...data,
                  hpCurrent: data.hpCurrent + values.healing,
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
                    id="healing"
                    name="healing"
                    value={values.healing}
                    onChange={handleChange}
                    label="Recover HP"
                  />
                </Box>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      values.healing = data.hpMax - data.hpCurrent;
                      handleSubmit();
                    }}
                  >
                    Full Heal
                  </Button>

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
