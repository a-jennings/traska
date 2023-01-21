import React, { ReactElement, useState, useEffect } from "react";
import { ContactInfo } from "../../types";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import axios from "axios";
import { Form, Formik } from "formik";

export type ContactProps = {
  data: ContactInfo;
  fetchContacts: () => void;
};

export function Contact(props: ContactProps): ReactElement {
  const { data, fetchContacts } = props;

  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleSave = () => {
    axios
      .patch(`http://localhost:3001/contacts/${data.id}`, {
        ...data,
        text: editorText,
      })
      .then(() => fetchContacts())
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/contacts/${data.id}`)
      .then(() => {
        fetchContacts();
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
            <Typography>{data.name}</Typography>
            <Box ml={2} display="flex" alignItems="center">
              <Typography fontSize="12px" sx={{ opacity: 0.8 }}>
                {data.description}
              </Typography>
              <Divider
                flexItem
                orientation="vertical"
                style={{
                  margin: "3px 10px",
                  backgroundColor: "grey",
                  opacity: 0.8,
                }}
              />
              <Typography fontSize="12px" sx={{ opacity: 0.8 }}>
                {data.gender}
              </Typography>
              <Divider
                flexItem
                orientation="vertical"
                style={{
                  margin: "3px 10px",
                  backgroundColor: "grey",
                  opacity: 0.8,
                }}
              />
              <Typography fontSize="12px" sx={{ opacity: 0.8 }}>
                {data.race}
              </Typography>
            </Box>
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
        <DialogTitle>Edit {data.name}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values) => {
              axios
                .patch(`http://localhost:3001/contacts/${values.id}`, {
                  ...values,
                })
                .then(() => {
                  fetchContacts();
                  handleDialogClose();
                });
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container my={1} spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="Contact Name"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="race"
                      name="race"
                      label="Race"
                      value={values.race}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="gender"
                      name="gender"
                      label="Gender"
                      value={values.gender}
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
