import React, { ReactElement, useState, useEffect } from "react";
import { NoteData } from "../../types";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { formatDateTime } from "../../formatting";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import axios from "axios";
import { Form, Formik } from "formik";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type NoteProps = {
  data: NoteData;
  fetchNotes: () => void;
};

export function Note(props: NoteProps): ReactElement {
  const { data, fetchNotes } = props;
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const createdDate = new Date(data.date);
  const editedDate = data.editDate && new Date(data.editDate);
  const now = new Date();

  const handleSave = () => {
    axios
      .patch(`http://localhost:3001/notes/${data.id}`, {
        ...data,
        text: editorText,
        editDate: now,
      })
      .then(() => fetchNotes())
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/notes/${data.id}`)
      .then(() => {
        fetchNotes();
        handleDialogClose();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (edit) {
      const interval = setInterval(() => {
        handleSave();
      }, 1000);

      return () => clearInterval(interval);
    }
  });

  return (
    <>
      <Box sx={{ boxShadow: 2, borderRadius: 1 }} py={1} px={3} mb={1}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography>{data.title}</Typography>
            <Box ml={2}>
              <Typography fontSize="12px" sx={{ opacity: 0.5 }}>
                Created: {formatDateTime(createdDate)}
              </Typography>
            </Box>

            {editedDate && (
              <Box ml={2}>
                <Typography fontSize="12px" sx={{ opacity: 0.5 }}>
                  Edited: {formatDateTime(editedDate)}
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            <IconButton onClick={handleDialogOpen}>
              <EditIcon color="info" />
            </IconButton>
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expanded}>
          {expanded && <Divider />}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {!edit && (
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: data.text }}
              />
            )}
            {edit && (
              <Box my={1} flex="1">
                <TextEditor
                  onChange={(value) => setEditorText(value)}
                  initialValue={data.text}
                />
              </Box>
            )}

            {!edit && (
              <IconButton color="info" onClick={() => setEdit(true)}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            {edit && (
              <>
                <Button
                  variant="outlined"
                  sx={{ marginRight: 1 }}
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setEdit(false);
                    handleSave();
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </Box>
        </Collapse>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit {data.title}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values) => {
              axios
                .patch(`http://localhost:3001/notes/${values.id}`, {
                  ...values,
                  title: values.title,
                })
                .then(() => {
                  fetchNotes();
                  handleDialogClose();
                });
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container my={1} spacing={1}>
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" onClick={handleDialogClose}>
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
    </>
  );
}
