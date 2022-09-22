import React, { ReactElement, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { SpecialAbilityData } from "../../../types";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Formik, Form } from "formik";
import { SpecialAbility } from "../../../components/Abilities/SpecialAbility";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const initialValues = {
  name: "",
  description: "",
  currentUses: 0,
  maxUses: 0,
  id: 0,
};

export function SpecialAbilities(): ReactElement {
  const [data, setData] = useState<Array<SpecialAbilityData>>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const fetchSpecialAbility = useCallback(() => {
    axios
      .get("http://localhost:3001/specialAbilities")
      .then((res: { data: Array<SpecialAbilityData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/specialAbilities")
      .then((res: { data: Array<SpecialAbilityData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen, fetchSpecialAbility]);

  const sortedData = data
    ?.filter((ability) => ability.maxUses > 0)
    .concat(data.filter((ability) => ability.maxUses === 0));

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box mb={2}>
        <Box display="flex" alignItems="center">
          <Typography fontSize={18} sx={{ textDecoration: "underline" }}>
            Special Abilities
          </Typography>
          <IconButton sx={{ marginLeft: 1 }} onClick={handleDialogOpen}>
            <AddCircleIcon color="info" />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item xs={7}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>Uses</Typography>
          </Grid>
          <Grid item xs={2} textAlign="right" />
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {sortedData?.map((ability) => (
          <SpecialAbility
            data={ability}
            fetchSpecialAbility={fetchSpecialAbility}
          />
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Special Ability</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: SpecialAbilityData) => {
              axios
                .post("http://localhost:3001/specialAbilities", values)
                .then(() => handleDialogClose())
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
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
                  <Grid item xs={6}>
                    <TextField
                      id="currentUses"
                      name="currentUses"
                      label="Current Uses"
                      value={values.currentUses}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="maxUses"
                      name="maxUses"
                      label="Max Uses"
                      value={values.maxUses}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
                <DialogActions>
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
