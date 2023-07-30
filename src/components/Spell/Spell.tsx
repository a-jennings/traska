import React, { ReactElement, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import { SpellData } from "../../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import { Add } from "@mui/icons-material";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SpellProps = {
  data: SpellData;
  fetchSpells: () => void;
};

export function Spell(props: SpellProps): ReactElement {
  const { data, fetchSpells } = props;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [castDialogOpen, setCastDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleCastDialogOpen = () => setCastDialogOpen(true);
  const handleCastDialogClose = () => setCastDialogOpen(false);

  const handleCast = () => {
    Promise.all([
      axios.patch(`http://localhost:3001/spells/${data.id}`, {
        ...data,
        spellPrepared: data.spellPrepared && data.spellPrepared - 1,
      }),
      axios.post("http://localhost:3001/log", {
        dateTime: new Date(Date.now()),
        logText: `Cast spell: ${data.spellName}`,
      }),
    ])
      .then(() => {
        fetchSpells();
        handleCastDialogClose();
      })
      .catch((error) => console.log(error));
  };

  const handlePrepare = () => {
    Promise.all([
      axios.patch(`http://localhost:3001/spells/${data.id}`, {
        ...data,
        spellPrepared: data.spellPrepared ? data.spellPrepared + 1 : 1,
      }),
      axios.post("http://localhost:3001/log", {
        dateTime: new Date(Date.now()),
        logText: `Prepared spell: ${data.spellName}`,
      }),
    ])
      .then(() => {
        fetchSpells();
        handleDialogClose();
      })
      .catch((error) => console.log(error));
  };

  const getBackgroundColor = (data: SpellData): string => {
    if (!data) {
      return "transparent";
    }

    if (data.spellPrepared && data.spellPrepared > 0) {
      return theme.palette.success.light;
    }

    return "transparent";
  };

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box
        px={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={theme.palette.grey[200]}
        bgcolor={getBackgroundColor(data)}
      >
        <Box display="flex" alignItems="center">
          <Typography>{data.spellName}</Typography>
          <Typography sx={{ marginLeft: 1, marginRight: 1 }} fontSize={12}>
            {data.spellMaterial ? <em>(M)</em> : ""}
          </Typography>
          <Typography fontSize={12} sx={{ opacity: 0.6 }}>
            {data.spellSummary}
          </Typography>
        </Box>
        <Box>
          {(data.spellPrepared || 0) > 0 && (
            <IconButton disabled>
              <Typography
                sx={{ color: theme.palette.common.white, opacity: 1 }}
              >
                {data.spellPrepared}
              </Typography>
            </IconButton>
          )}
          {(data.spellPrepared || 0) > 0 && (
            <IconButton onClick={handleCastDialogOpen}>
              <AutoFixHighIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>
          )}
          <IconButton onClick={handleDialogOpen}>
            <Add />
          </IconButton>
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
      </Box>
      <Box p={1}>
        <Collapse in={expanded}>
          {data.spellSchool && (
            <Typography>
              <strong>School:</strong> {data.spellSchool}
            </Typography>
          )}
          {data.spellDescriptor && (
            <Typography>
              <strong>Descriptor:</strong> {data.spellDescriptor}
            </Typography>
          )}
          {data.spellComponents && (
            <Typography>
              <strong>Components:</strong> {data.spellComponents}
            </Typography>
          )}
          {data.spellCastingTime && (
            <Typography>
              <strong>Casting Time:</strong> {data.spellCastingTime}
            </Typography>
          )}
          {data.spellRange && (
            <Typography>
              <strong>Range:</strong> {data.spellRange}
            </Typography>
          )}
          {data.spellDuration && (
            <Typography>
              <strong>Duration:</strong> {data.spellDuration}
            </Typography>
          )}
          {data.spellTarget && (
            <Typography>
              <strong>Target:</strong> {data.spellTarget}
            </Typography>
          )}
          {data.spellSavingThrow && (
            <Typography>
              <strong>Saving Throw:</strong> {data.spellSavingThrow}
            </Typography>
          )}
          {data.spellResistance && (
            <Typography>
              <strong>Resistance:</strong> {data.spellResistance}
            </Typography>
          )}
          {data.spellArea && (
            <Typography>
              <strong>Area:</strong> {data.spellArea}
            </Typography>
          )}
          {data.spellMaterial && (
            <Typography>
              <strong>Material:</strong> <em>{data.spellMaterial}</em>
            </Typography>
          )}
          <Box px={10} py={1}>
            <Divider />
          </Box>
          {data.spellDescription && (
            <Box mt={1}>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: data.spellDescription }}
              />
            </Box>
          )}
        </Collapse>
      </Box>
      <Dialog
        open={castDialogOpen}
        onClose={handleCastDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Cast {data.spellName}?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCastDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleCast()}
          >
            Cast
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen}>
        <DialogTitle>Prepare {data.spellName}?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to prepare {data.spellName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handlePrepare}>
            Prepare
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
