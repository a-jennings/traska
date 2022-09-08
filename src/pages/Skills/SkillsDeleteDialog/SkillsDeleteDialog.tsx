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
import { Skill } from "../../../types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SkillsDeleteDialogProps = {
  skill: Skill;
  dialogOpen: boolean;
  onClose: () => void;
};

export function SkillsDeleteDialog(
  props: SkillsDeleteDialogProps
): ReactElement {
  const { skill, dialogOpen, onClose } = props;

  const handleDelete = (skill: Skill) => {
    axios
      .delete(`http://localhost:3001/skills/${skill.id}`)
      .then(() => onClose())
      .catch((error) => console.log(error));
  };

  return (
    <Dialog open={dialogOpen} onClose={onClose}>
      <DialogTitle>Delete {skill.name}</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete {skill.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(skill)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
