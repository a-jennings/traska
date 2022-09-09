import React, { ReactElement, useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import HotelIcon from "@mui/icons-material/Hotel";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function SpellMenu(): ReactElement {
  const [regenDialogOpen, setRegenDialogOpen] = useState(false);

  const handleRegenDialogOpen = () => setRegenDialogOpen(true);
  const handleRegenDialogClose = () => setRegenDialogOpen(false);

  const handleRegenerateSpellSlots = () => {
    return; //TODO
  };

  return (
    <>
      <SpeedDial
        ariaLabel="spell-menu"
        icon={<MenuIcon />}
        sx={{ position: "absolute", bottom: 30, right: 30 }}
      >
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Add Spell" />
        <SpeedDialAction
          icon={<HotelIcon />}
          tooltipTitle="Regain Spell Slots"
          onClick={handleRegenDialogOpen}
        />
      </SpeedDial>

      <Dialog
        open={regenDialogOpen}
        onClose={handleRegenDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Regenerate Spell Slots</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleRegenDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleRegenerateSpellSlots}
          >
            Regenerate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
