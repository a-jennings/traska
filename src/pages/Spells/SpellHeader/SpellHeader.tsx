import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { SpellSlotData } from "../../../types";
import SettingsIcon from "@mui/icons-material/Settings";
import { Formik, Form } from "formik";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SpellHeaderProps = {
  fetchSpells: () => void;
};

export function SpellHeader(props: SpellHeaderProps): ReactElement {
  const [data, setData] = useState<SpellSlotData>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/spellSlots")
      .then((res: { data: SpellSlotData }) => {
        setData(res.data);
      })
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
        bgcolor={theme.palette.grey[400]}
        mb={1}
      >
        {data.zero > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 0</Typography>
            <Typography>
              {data.zero + data.zeroBonus} + {data.zeroDomain}
            </Typography>
          </Box>
        )}
        {data.one > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 1</Typography>
            <Typography>
              {data.one + data.oneBonus} + {data.oneDomain}
            </Typography>
          </Box>
        )}
        {data.two > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 2</Typography>
            <Typography>
              {data.two + data.twoBonus} + {data.twoDomain}
            </Typography>
          </Box>
        )}
        {data.three > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 3</Typography>
            <Typography>
              {data.three + data.threeBonus} + {data.threeDomain}
            </Typography>
          </Box>
        )}
        {data.four > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 4</Typography>
            <Typography>
              {data.four + data.fourBonus} + {data.fourDomain}
            </Typography>
          </Box>
        )}
        {data.five > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 5</Typography>
            <Typography>
              {data.five + data.fiveBonus} + {data.fiveDomain}
            </Typography>
          </Box>
        )}
        {data.six > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 6</Typography>
            <Typography>
              {data.six + data.sixBonus} + {data.sixDomain}
            </Typography>
          </Box>
        )}
        {data.seven > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 7</Typography>
            <Typography>
              {data.seven + data.sevenBonus} + {data.sevenDomain}
            </Typography>
          </Box>
        )}
        {data.eight > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 8</Typography>
            <Typography>
              {data.eight + data.eightBonus} + {data.eightDomain}
            </Typography>
          </Box>
        )}
        {data.nine > 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" py={1}>
            <Typography fontWeight="bold">Level 9</Typography>
            <Typography>
              {data.nine + data.nineBonus} + {data.nineDomain}
            </Typography>
          </Box>
        )}
      </Box>

      <Fab
        size="small"
        color="secondary"
        sx={{ position: "absolute", top: 12.5, right: 100 }}
        onClick={handleDialogOpen}
      >
        <SettingsIcon />
      </Fab>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Spell Slots</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values: SpellSlotData) => {
              axios
                .patch("http://localhost:3001/spellSlots", values)
                .then(() => {
                  props.fetchSpells();
                  handleDialogClose();
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container mt={1} spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography>Zero</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="zero"
                      name="zero"
                      label="Slots"
                      value={values.zero}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="zeroBonus"
                      name="zeroBonus"
                      label="Bonus Slots"
                      value={values.zeroBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="zeroDomain"
                      name="zeroDomain"
                      label="Domain Slots"
                      value={values.zeroDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>One</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="one"
                      name="one"
                      label="Slots"
                      value={values.one}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="oneBonus"
                      name="oneBonus"
                      label="Bonus Slots"
                      value={values.oneBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="oneDomain"
                      name="oneDomain"
                      label="Domain Slots"
                      value={values.oneDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Two</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="two"
                      name="two"
                      label="Slots"
                      value={values.two}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="twoBonus"
                      name="twoBonus"
                      label="Bonus Slots"
                      value={values.twoBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="twoDomain"
                      name="twoDomain"
                      label="Domain Slots"
                      value={values.twoDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Three</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="three"
                      name="three"
                      label="Slots"
                      value={values.three}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="threeBonus"
                      name="threeBonus"
                      label="Bonus Slots"
                      value={values.threeBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="threeDomain"
                      name="threeDomain"
                      label="Domain Slots"
                      value={values.threeDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Four</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="four"
                      name="four"
                      label="Slots"
                      value={values.four}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="fourBonus"
                      name="fourBonus"
                      label="Bonus Slots"
                      value={values.fourBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="fourDomain"
                      name="fourDomain"
                      label="Domain Slots"
                      value={values.fourDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Five</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="five"
                      name="five"
                      label="Slots"
                      value={values.five}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="fiveBonus"
                      name="fiveBonus"
                      label="Bonus Slots"
                      value={values.fiveBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="fiveDomain"
                      name="fiveDomain"
                      label="Domain Slots"
                      value={values.fiveDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Six</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="six"
                      name="six"
                      label="Slots"
                      value={values.six}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="sixBonus"
                      name="sixBonus"
                      label="Bonus Slots"
                      value={values.sixBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="sixDomain"
                      name="sixDomain"
                      label="Domain Slots"
                      value={values.sixDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Seven</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="seven"
                      name="seven"
                      label="Slots"
                      value={values.seven}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="sevenBonus"
                      name="sevenBonus"
                      label="Bonus Slots"
                      value={values.sevenBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="sevenDomain"
                      name="sevenDomain"
                      label="Domain Slots"
                      value={values.sevenDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Eight</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="eight"
                      name="eight"
                      label="Slots"
                      value={values.eight}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="eightBonus"
                      name="eightBonus"
                      label="Bonus Slots"
                      value={values.eightBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="eightDomain"
                      name="eightDomain"
                      label="Domain Slots"
                      value={values.eightDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Nine</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="nine"
                      name="nine"
                      label="Slots"
                      value={values.nine}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="nineBonus"
                      name="nineBonus"
                      label="Bonus Slots"
                      value={values.nineBonus}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="nineDomain"
                      name="nineDomain"
                      label="Domain Slots"
                      value={values.nineDomain}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      type="number"
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
