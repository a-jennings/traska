import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
} from "@mui/material";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Formik, Form } from "formik";
import { NoteData } from "../../types";
import { Note } from "../../components/Note/Note";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const now = new Date();

const initialValues = {
  title: "",
  text: "",
  date: now,
  editDate: null,
};

export function Notes(): ReactElement {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [data, setData] = useState<Array<NoteData>>();

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((res: { data: Array<NoteData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [addDialogOpen]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ position: "absolute", top: 10, right: 30 }}
        onClick={handleAddDialogOpen}
      >
        Add Note
      </Button>
      <Box py={2} px={8}>
        {data.map((note, index) => (
          <Note data={note} key={index} />
        ))}
      </Box>

      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: NoteData) => {
              axios
                .post("http://localhost:3001/notes", values)
                .then(() => handleAddDialogClose())
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container mt={1} spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      value={values.title}
                      onChange={handleChange}
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
                    Create
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
