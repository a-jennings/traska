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
import { AttackData } from "../../types";
import axios from "axios";

type AttackFormProps = {
  data?: AttackData;
  onClose: () => void;
  variant: "edit" | "add";
  fetchAttacks: () => void;
};

export function AttackForm(props: AttackFormProps): ReactElement {
  const { data, onClose, variant, fetchAttacks } = props;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleConfirmDialogOpen = () => setConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setConfirmDialogOpen(false);

  const initialValues = data
    ? data
    : {
        name: "",
        bonus: 0,
        damage: "",
        critical: "",
        range: "",
        type: "",
        notes: "",
        id: 0,
      };

  const handleSubmit = (values: AttackData) => {
    if (variant === "add") {
      axios
        .post("http://localhost:3001/attacks", values)
        .then(() => {
          fetchAttacks();
          onClose();
        })
        .catch((error) => console.log(error));
    }

    if (variant === "edit") {
      axios
        .patch(`http://localhost:3001/attacks/${values.id}`, values)
        .then(() => {
          fetchAttacks();
          onClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/attacks/${data?.id}`)
      .then(() => {
        fetchAttacks();
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
                  id="damage"
                  name="damage"
                  label="Damage"
                  value={values.damage}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="critical"
                  name="critical"
                  label="Critical"
                  value={values.critical}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="range"
                  name="range"
                  label="Range"
                  value={values.range}
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
              <Grid item xs={12}>
                <TextField
                  id="notes"
                  name="notes"
                  label="Notes"
                  value={values.notes}
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
