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
  TextField,
  Grid,
  Button,
  MenuItem,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { SpellData } from "../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import { Formik, Form } from "formik";
import { TextEditor } from "./TextEditor/TextEditor";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SpellProps = {
  data: SpellData;
  fetchSpells: () => void;
};

const levelOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Spell(props: SpellProps): ReactElement {
  const { data, fetchSpells } = props;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [castDialogOpen, setCastDialogOpen] = useState(false);
  const [editorText, setEditorText] = useState("");

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDialogOpen = () => setConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setConfirmDialogOpen(false);
  const handleCastDialogOpen = () => setCastDialogOpen(true);
  const handleCastDialogClose = () => setCastDialogOpen(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/spells/${data.id}`)
      .then(() => {
        fetchSpells();
        handleConfirmDialogClose();
        handleDialogClose();
      })
      .catch((error) => console.log(error));
  };

  const handleCast = () => {
    axios
      .patch(`http://localhost:3001/spells/${data.id}`, {
        ...data,
        spellPrepared: data.spellPrepared - 1,
      })
      .then(() => {
        fetchSpells();
        handleCastDialogClose();
      })
      .catch((error) => console.log(error));
  };

  const getBackgroundColor = (data: SpellData): string => {
    if (!data) {
      return "transparent";
    }

    if (data?.spellName?.includes("Cure")) {
      return "pink";
    }

    if (data.spellDomainSpell) {
      return theme.palette.warning.main;
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
          {data.spellPrepared > 0 && (
            <IconButton disabled>
              <Typography
                sx={{ color: theme.palette.common.white, opacity: 1 }}
              >
                {data.spellPrepared}
              </Typography>
            </IconButton>
          )}
          {data.spellPrepared > 0 && (
            <IconButton onClick={handleCastDialogOpen}>
              <AutoFixHighIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>
          )}
          <IconButton onClick={handleDialogOpen}>
            <EditIcon />
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
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Edit {data.spellName}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values) => {
              axios
                .patch(`http://localhost:3001/spells/${values.id}`, {
                  ...values,
                  spellDescription: editorText,
                  spellDescriptionTwo: "",
                  spellDescriptionThree: "",
                  spellDescriptionFour: "",
                })
                .then(() => {
                  fetchSpells();
                  handleDialogClose();
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container spacing={1} my={1}>
                  <Grid item xs={4}>
                    <TextField
                      id="spellName"
                      name="spellName"
                      size="small"
                      fullWidth
                      value={values.spellName}
                      onChange={handleChange}
                      label="Spell Name"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="spellSchool"
                      name="spellSchool"
                      size="small"
                      fullWidth
                      value={values.spellSchool}
                      onChange={handleChange}
                      label="Spell School"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="spellDescriptor"
                      name="spellDescriptor"
                      size="small"
                      fullWidth
                      value={values.spellDescriptor}
                      onChange={handleChange}
                      label="Spell Descriptor"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellLevel"
                      name="spellLevel"
                      size="small"
                      fullWidth
                      value={values.spellLevel}
                      onChange={handleChange}
                      label="Spell Level"
                      select
                    >
                      {levelOptions.map((level, i) => (
                        <MenuItem key={i} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellComponents"
                      name="spellComponents"
                      size="small"
                      fullWidth
                      value={values.spellComponents}
                      onChange={handleChange}
                      label="Spell Component"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellCastingTime"
                      name="spellCastingTime"
                      size="small"
                      fullWidth
                      value={values.spellCastingTime}
                      onChange={handleChange}
                      label="Spell Casting Time"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="spellRange"
                      name="spellRange"
                      size="small"
                      fullWidth
                      value={values.spellRange}
                      onChange={handleChange}
                      label="Spell Range"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellDuration"
                      name="spellDuration"
                      size="small"
                      fullWidth
                      value={values.spellDuration}
                      onChange={handleChange}
                      label="Spell Duration"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellTarget"
                      name="spellTarget"
                      size="small"
                      fullWidth
                      value={values.spellTarget}
                      onChange={handleChange}
                      label="Spell Target"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellSavingThrow"
                      name="spellSavingThrow"
                      size="small"
                      fullWidth
                      value={values.spellSavingThrow}
                      onChange={handleChange}
                      label="Spell Saving Throw"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellResistance"
                      name="spellResistance"
                      size="small"
                      fullWidth
                      value={values.spellResistance}
                      onChange={handleChange}
                      label="Spell Resistance"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellArea"
                      name="spellArea"
                      size="small"
                      fullWidth
                      value={values.spellArea}
                      onChange={handleChange}
                      label="Spell Area"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellEffect"
                      name="spellEffect"
                      size="small"
                      fullWidth
                      value={values.spellEffect}
                      onChange={handleChange}
                      label="Spell Effect"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellPrepared"
                      name="spellPrepared"
                      size="small"
                      fullWidth
                      value={values.spellPrepared}
                      onChange={handleChange}
                      label="Spell Prepared"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.spellDomainSpell}
                          onChange={handleChange}
                          id="spellDomainSpell"
                          name="spellDomainSpell"
                        />
                      }
                      label="Domain Spell?"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="spellMaterial"
                      name="spellMaterial"
                      size="small"
                      fullWidth
                      value={values.spellMaterial}
                      onChange={handleChange}
                      label="Spell Material"
                    />
                  </Grid>
                  <Grid item xs={12} my={1}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="spellSummary"
                      name="spellSummary"
                      size="small"
                      fullWidth
                      value={values.spellSummary}
                      onChange={handleChange}
                      label="Spell Summary"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextEditor
                      initialValue={
                        values?.spellDescription +
                          values?.spellDescriptionTwo +
                          values.spellDescriptionThree +
                          values.spellDescriptionFour || ""
                      }
                      onChange={(value) => {
                        setEditorText(value);
                      }}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleConfirmDialogOpen}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {data.spellName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleConfirmDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
          <Button variant="contained" color="success" onClick={handleCast}>
            Cast
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
