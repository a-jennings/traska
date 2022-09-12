import React, { ReactElement, useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { AttackData } from "../../../types";
import { Attack } from "../../../components/Abilities/Attack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AttackForm } from "../../../components/Abilities/AttackForm";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Attacks(): ReactElement {
  const [data, setData] = useState<Array<AttackData>>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const fetchAttacks = useCallback(() => {
    axios
      .get("http://localhost:3001/attacks")
      .then((res: { data: Array<AttackData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/attacks")
      .then((res: { data: Array<AttackData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [fetchAttacks]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize={18} sx={{ textDecoration: "underline" }}>
            Attacks
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
            <Typography>Attack Bonus</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>Damage</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {data?.map((attack, i) => (
          <Attack key={i} data={attack} fetchAttacks={fetchAttacks} />
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Attack</DialogTitle>
        <DialogContent>
          <AttackForm
            onClose={handleDialogClose}
            variant="add"
            fetchAttacks={fetchAttacks}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
