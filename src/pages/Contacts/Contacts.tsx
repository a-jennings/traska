import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  DialogActions,
} from "@mui/material";
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import axios from "axios";
import { ContactInfo } from "../../types";
import { Contact } from "../../components/Contact/Contact";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Contacts(): ReactElement {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [data, setData] = useState<Array<ContactInfo>>();

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);

  const fetchContacts = useCallback(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((res: { data: Array<ContactInfo> }) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((res: { data: Array<ContactInfo> }) => {
        setData(res.data);
      })
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
        Add Contact
      </Button>
      <Box py={2} px={8}>
        {data.map((contact, index) => (
          <Contact data={contact} key={index} fetchContacts={fetchContacts} />
        ))}
      </Box>

      <Dialog open={addDialogOpen}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              text: "",
              gender: "",
              race: "",
            }}
            onSubmit={(values) => {
              axios
                .post("http://localhost:3001/contacts", values)
                .then(() => {
                  handleAddDialogClose();
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container mt={1} spacing={1}>
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
                  <Button variant="outlined" onClick={handleAddDialogClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={() => handleSubmit()}>
                    Create Contact
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
