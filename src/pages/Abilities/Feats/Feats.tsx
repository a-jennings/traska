import React, { ReactElement, useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Formik, Form } from "formik";
import axios from "axios";
import { FeatData } from "../../../types";
import { Feat } from "../../../components/Abilities/Feat";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const initialValues = {
  name: "",
  description: "",
};

export function Feats(): ReactElement {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [data, setData] = useState<Array<FeatData>>();

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);

  const fetchFeats = useCallback(() => {
    axios
      .get("http://localhost:3001/feats")
      .then((res: { data: Array<FeatData> }) => setData(res.data))
      .then((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/feats")
      .then((res: { data: Array<FeatData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [fetchFeats]);

  if (!data) {
    return <></>;
  }
  return (
    <>
      <Box mb={2}>
        <Box display="flex" alignItems="center">
          <Typography fontSize={18} sx={{ textDecoration: "underline" }}>
            Feats
          </Typography>
          <IconButton sx={{ marginLeft: 1 }} onClick={handleAddDialogOpen}>
            <AddCircleIcon color="info" />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item xs={11}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {data?.map((feat, i) => (
          <Feat data={feat} key={i} fetchFeats={fetchFeats} />
        ))}
      </Box>

      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Feat</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              axios
                .post("http://localhost:3001/feats", values)
                .then(() => {
                  fetchFeats();
                  handleAddDialogClose();
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
    </>
  );
}
