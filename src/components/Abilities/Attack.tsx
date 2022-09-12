import React, { ReactElement, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AttackData } from "../../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { AttackForm } from "./AttackForm";

type AttackProps = {
  data: AttackData;
  fetchAttacks: () => void;
};

export function Attack(props: AttackProps): ReactElement {
  const { data, fetchAttacks } = props;
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <Typography>{data.name}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>{data.bonus}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>{data.damage}</Typography>
          </Grid>
          <Grid item xs={1} textAlign="right">
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
        </Grid>

        <Collapse in={expanded}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
              <Typography>
                <strong>Critical Modifier:</strong> {data.critical}
              </Typography>
              <Typography>
                <strong>Range:</strong> {data.range}
              </Typography>
              <Typography>
                <strong>Damage Type:</strong> {data.type}
              </Typography>
              <Typography>
                <strong>Notes: </strong> {data.notes}
              </Typography>
            </Box>
            <IconButton onClick={handleDialogOpen}>
              <EditIcon color="info" />
            </IconButton>
          </Box>
        </Collapse>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit {data.name}</DialogTitle>
        <DialogContent>
          <AttackForm
            data={data}
            onClose={handleDialogClose}
            variant="edit"
            fetchAttacks={fetchAttacks}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
