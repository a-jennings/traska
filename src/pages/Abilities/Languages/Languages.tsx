import {
  Box,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { LanguageData } from "../../../types";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Formik, Form } from "formik";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Languages(): ReactElement {
  const [data, setData] = useState<Array<LanguageData>>();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selected, setSelected] = useState<LanguageData>();

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);
  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = () => {
    setSelected(undefined);
    setEditDialogOpen(false);
  };
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/languages/${selected?.id}`).then(() => {
      fetchLanguages();
      setSelected(undefined);
      handleDeleteDialogClose();
      handleEditDialogClose();
    });
  };

  const fetchLanguages = useCallback(() => {
    axios
      .get("http://localhost:3001/languages")
      .then((res: { data: Array<LanguageData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/languages")
      .then((res: { data: Array<LanguageData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [fetchLanguages]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography fontSize={18} sx={{ textDecoration: "underline" }}>
            Languages
          </Typography>
          <IconButton sx={{ marginLeft: 1 }} onClick={handleAddDialogOpen}>
            <AddCircleIcon color="info" />
          </IconButton>
        </Box>
        {data?.map((language, i) => (
          <Grid container key={i}>
            <Grid item xs={11}>
              <Typography>{language.name}</Typography>
            </Grid>
            <Grid item xs={1} textAlign="right">
              <IconButton
                onClick={() => {
                  setSelected(language);
                  handleEditDialogOpen();
                }}
              >
                <EditIcon color="info" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>

      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Language</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: "", id: 0 }}
            onSubmit={(values: LanguageData) => {
              axios
                .post("http://localhost:3001/languages", values)
                .then(() => {
                  fetchLanguages();
                  handleAddDialogClose();
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container spacing={1} my={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="Name"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button variant="outlined" onClick={handleAddDialogClose}>
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

      {selected && (
        <Dialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <Formik
              initialValues={selected}
              onSubmit={(values: LanguageData) => {
                axios
                  .patch(
                    `http://localhost:3001/languages/${selected.id}`,
                    values
                  )
                  .then(() => {
                    fetchLanguages();
                    setSelected(undefined);
                    handleAddDialogClose();
                  })
                  .catch((error) => console.log(error));
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form>
                  <Grid container spacing={1} my={1}>
                    <Grid item xs={12}>
                      <TextField
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        label="Name"
                        fullWidth
                        size="small"
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
      )}

      {selected && (
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Delete {selected.name}?</DialogTitle>
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
              onClick={() => {
                setSelected(undefined);
                handleDelete();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
