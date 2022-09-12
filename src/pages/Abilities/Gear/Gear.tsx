import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { GearData } from "../../../types";
import { GearForm } from "../../../components/Abilities/GearForm";
import { GearItem } from "../../../components/Abilities/GearItem";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Gear(): ReactElement {
  const [data, setData] = useState<Array<GearData>>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const fetchGear = useCallback(() => {
    axios
      .get("http://localhost:3001/gear")
      .then((res: { data: Array<GearData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gear")
      .then((res: { data: Array<GearData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [fetchGear]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box mb={2}>
        <Box display="flex" alignItems="center">
          <Typography fontSize={18} sx={{ textDecoration: "underline" }}>
            Gear
          </Typography>
          <IconButton sx={{ marginLeft: 1 }} onClick={handleDialogOpen}>
            <AddCircleIcon color="info" />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item xs={5}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>Type</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>AC Bonus</Typography>
          </Grid>
          <Grid item xs={1} textAlign="right" />
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {data?.map((gear, i) => (
          <GearItem key={i} data={gear} fetchGear={fetchGear} />
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Gear</DialogTitle>
        <DialogContent>
          <GearForm
            onClose={handleDialogClose}
            variant="add"
            fetchGear={fetchGear}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
