import React, { ReactElement, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import { GearData } from "../../types";
import axios from "axios";

type GearFormProps = {
  data?: GearData;
  onClose: () => void;
  variant: "edit" | "add";
  fetchGear: () => void;
};

export function GearForm(props: GearFormProps): ReactElement {
  const { data, onClose, variant, fetchGear } = props;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleConfirmDialogOpen = () => setConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setConfirmDialogOpen(false);

  const initialValues = data
    ? data
    : {
        id: 0,
        name: "",
        type: "",
        bonus: 0,
        maxDex: "",
        checkPenalty: "",
        spellFailure: "",
        speed: "",
        weight: 0,
        properties: "",
      };

  const handleSubmit = (values: GearData) => {
    if (variant === "add") {
      axios
        .post("http://localhost:3001/gear", values)
        .then(() => {
          fetchGear();
          onClose();
        })
        .catch((error) => console.log(error));
    }

    if (variant === "edit") {
      axios
        .patch(`http://localhost:3001/gear/${values.id}`, values)
        .then(() => {
          fetchGear();
          onClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/gear/${data?.id}`)
      .then(() => {
        fetchGear();
        onClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <Grid container spacing={1} my={1}>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="type"
                  name="type"
                  label="Type"
                  value={values.type}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="bonus"
                  name="bonus"
                  label="Bonus"
                  value={values.bonus}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="maxDex"
                  name="maxDex"
                  label="Max Dex"
                  value={values.maxDex}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="checkPenalty"
                  name="checkPenalty"
                  label="Check Penalty"
                  value={values.checkPenalty}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="spellFailure"
                  name="spellFailure"
                  label="Spell Failure"
                  value={values.spellFailure}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="speed"
                  name="speed"
                  label="Speed"
                  value={values.speed}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="weight"
                  name="weight"
                  label="Weight"
                  value={values.weight}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="properties"
                  name="properties"
                  label="Properties"
                  value={values.properties}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                />
              </Grid>
            </Grid>
            <DialogActions>
              {variant === "edit" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDialogOpen}
                >
                  Delete
                </Button>
              )}
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

      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete {data?.name}?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleConfirmDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
