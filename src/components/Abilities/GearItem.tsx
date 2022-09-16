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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { GearData } from "../../types";
import { GearForm } from "./GearForm";

type GearItemProps = {
  data: GearData;
  fetchGear: () => void;
};

export function GearItem(props: GearItemProps): ReactElement {
  const { data, fetchGear } = props;
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <Typography>{data.name}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>{data.type}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>{data.bonus}</Typography>
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
              {data.maxDex && (
                <Typography>
                  <strong>Maximum Dexterity:</strong> {data.maxDex}
                </Typography>
              )}
              {data.checkPenalty && (
                <Typography>
                  <strong>Check Penalty:</strong> {data.checkPenalty}
                </Typography>
              )}
              {data.spellFailure && (
                <Typography>
                  <strong>Spell Failure:</strong> {data.spellFailure}
                </Typography>
              )}
              {data.speed && (
                <Typography>
                  <strong>Speed:</strong> {data.speed}
                </Typography>
              )}
              {data.weight && (
                <Typography>
                  <strong>Weight:</strong> {data.weight}
                </Typography>
              )}
              {data.properties && (
                <Typography>
                  <strong>Properties:</strong> {data.properties}
                </Typography>
              )}
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
          <GearForm
            data={data}
            onClose={handleDialogClose}
            variant="edit"
            fetchGear={fetchGear}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
