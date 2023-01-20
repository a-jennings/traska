import React, { ReactElement } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type InventoryAddDialogProps = {
  dialogOpen: boolean;
  onClose: () => void;
};

export function InventoryAddDialog(
  props: InventoryAddDialogProps
): ReactElement {
  const { dialogOpen, onClose } = props;

  return (
    <Dialog open={dialogOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ name: "", weight: 0 }}
          onSubmit={(values) => {
            Promise.all([
              axios.post("http://localhost:3001/inventory", values),
              axios.post("http://localhost:3001/log", {
                dateTime: new Date(Date.now()),
                logText: `Added item: ${values.name}`,
              }),
            ])
              .then(() => onClose())
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <Grid container spacing={1} my={1}>
                <Grid item xs={9}>
                  <TextField
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    label="Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="weight"
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                    label="Weight"
                    fullWidth
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
    </Dialog>
  );
}
