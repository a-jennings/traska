import React, { ReactElement } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Item } from "../../../types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type InventoryDeleteDialogProps = {
  item: Item;
  dialogOpen: boolean;
  onClose: () => void;
};

export function InventoryDeleteDialog(
  props: InventoryDeleteDialogProps
): ReactElement {
  const { item, dialogOpen, onClose } = props;

  const handleDelete = (id: number) => {
    Promise.all([
      axios.delete(`http://localhost:3001/inventory/${id}`),
      axios.post("http://localhost:3001/log", {
        dateTime: new Date(Date.now()),
        logText: `Deleted item: ${item.name}`,
      }),
    ])
      .then(() => onClose())
      .catch((error) => console.log(error));
  };

  return (
    <Dialog open={dialogOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete {item.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
