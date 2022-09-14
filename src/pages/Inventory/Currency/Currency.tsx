import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { CurrencyData } from "../../../types";
import PaidIcon from "@mui/icons-material/Paid";
import { Formik, Form } from "formik";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Currency(): ReactElement {
  const [data, setData] = useState<CurrencyData>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/currency")
      .then((res: { data: CurrencyData }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor={theme.palette.grey[300]}
        mb={2}
        p={0.5}
      >
        <Typography>
          <strong>Copper:</strong> {data.copper}
        </Typography>
        <Typography>
          <strong>Silver:</strong> {data.silver}
        </Typography>
        <Typography>
          <strong>Gold:</strong> {data.gold}
        </Typography>
        <Typography>
          <strong>Platinum:</strong> {data.platinum}
        </Typography>

        <IconButton color="warning" onClick={handleDialogOpen}>
          <PaidIcon />
        </IconButton>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Get Paid</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values: CurrencyData) => {
              axios
                .patch("http://localhost:3001/currency", values)
                .then(() => handleDialogClose())
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container mt={1} spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="copper"
                      name="copper"
                      value={values.copper}
                      fullWidth
                      size="small"
                      onChange={handleChange}
                      type="number"
                      label="Copper"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="silver"
                      name="silver"
                      value={values.silver}
                      fullWidth
                      size="small"
                      onChange={handleChange}
                      type="number"
                      label="Silver"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="gold"
                      name="gold"
                      value={values.gold}
                      fullWidth
                      size="small"
                      onChange={handleChange}
                      type="number"
                      label="Gold"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="platinum"
                      name="platinum"
                      value={values.platinum}
                      fullWidth
                      size="small"
                      onChange={handleChange}
                      type="number"
                      label="Platinum"
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
