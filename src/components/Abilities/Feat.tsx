import React, { ReactElement, useState } from "react";
import { FeatData } from "../../types";
import {
  Grid,
  Typography,
  IconButton,
  Collapse,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Formik, Form } from "formik";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type FeatProps = {
  data: FeatData;
  fetchFeats: () => void;
};

export function Feat(props: FeatProps): ReactElement {
  const { data, fetchFeats } = props;
  const [expanded, setExpanded] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = () => setEditDialogOpen(false);
  const handleDeleteDialogOpen = () => setConfirmDialogOpen(true);
  const handleDeleteDialogClose = () => setConfirmDialogOpen(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/feats/${data.id}`)
      .then(() => {
        fetchFeats();
        handleDeleteDialogClose();
        handleEditDialogClose();
      })
      .catch((error) => console.log(error));
  };

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={11}>
          <Typography>{data.name}</Typography>
        </Grid>
        <Grid item xs={1} textAlign="right">
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
      </Grid>

      <Collapse in={expanded}>
        <Box display="flex" alignItems="flex-end">
          <Typography>
            <strong>Description:</strong> {data.description}
          </Typography>
          <IconButton onClick={handleEditDialogOpen}>
            <EditIcon color="info" />
          </IconButton>
        </Box>
      </Collapse>

      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit {data.name}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values: FeatData) => {
              axios
                .patch(`http://localhost:3001/feats/${data.id}`, values)
                .then(() => {
                  fetchFeats();
                  handleEditDialogClose();
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container my={1} spacing={1}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      multiline
                      minRows={2}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteDialogOpen}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" onClick={handleEditDialogClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={() => handleSubmit()}>
                    Save
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleDeleteDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete {data.name}?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDeleteDialogClose}>
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
