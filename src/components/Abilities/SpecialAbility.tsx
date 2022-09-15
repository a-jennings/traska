import React, { ReactElement, useState } from "react";
import { SpecialAbilityData } from "../../types";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Collapse,
  useTheme,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form } from "formik";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SpecialAbilityProps = {
  data: SpecialAbilityData;
  fetchSpecialAbility: () => void;
};

export function SpecialAbility(props: SpecialAbilityProps): ReactElement {
  const { data, fetchSpecialAbility } = props;
  const [expanded, setExpanded] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const theme = useTheme();

  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = () => setEditDialogOpen(false);
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/specialAbilities/${data.id}`)
      .then(() => {
        fetchSpecialAbility();
        handleDeleteDialogOpen();
        handleEditDialogClose();
      });
  };

  const handleCast = () => {
    axios
      .patch(`http://localhost:3001/specialAbilities/${data.id}`, {
        ...data,
        currentUses: data.currentUses - 1,
      })
      .then(() => fetchSpecialAbility())
      .catch((error) => console.log(error));
  };

  const handleRegenerate = () => {
    axios
      .patch(`http://localhost:3001/specialAbilities/${data.id}`, {
        ...data,
        currentUses: data.maxUses,
      })
      .then(() => fetchSpecialAbility())
      .catch((error) => console.log(error));
  };

  const castableAbility = data.maxUses !== 0;

  return (
    <>
      <Box>
        <Grid
          container
          alignItems="center"
          bgcolor={
            data.currentUses > 0
              ? theme.palette.primary.light
              : theme.palette.grey[200]
          }
          borderBottom="1px solid"
          borderColor={theme.palette.common.white}
        >
          <Grid item xs={7}>
            <Typography>{data.name}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography>
              {data.currentUses}/{data.maxUses}
            </Typography>
          </Grid>
          <Grid item xs={2} textAlign="right">
            {castableAbility && (
              <IconButton
                onClick={handleRegenerate}
                sx={{ color: theme.palette.success.dark }}
                disabled={Boolean(data.currentUses)}
              >
                <CachedIcon />
              </IconButton>
            )}
            {castableAbility && (
              <IconButton
                onClick={handleCast}
                disabled={!data.currentUses}
                sx={{ color: theme.palette.common.white }}
              >
                <AutoFixHighIcon />
              </IconButton>
            )}
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={expanded}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            <Typography>{data.description}</Typography>
            <IconButton color="info" onClick={handleEditDialogOpen}>
              <EditIcon />
            </IconButton>
          </Box>
        </Collapse>
      </Box>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit {data.name}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={(values: SpecialAbilityData) => {
              axios
                .patch(
                  `http://localhost:3001/specialAbilities/${data.id}`,
                  values
                )
                .then(() => {
                  fetchSpecialAbility();
                  handleEditDialogClose();
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      multiline
                      minRows={2}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="currentUses"
                      name="currentUses"
                      label="Current Uses"
                      value={values.currentUses}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="maxUses"
                      name="maxUses"
                      label="Max Uses"
                      value={values.maxUses}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteDialogOpen}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" onClick={handleEditDialogClose}>
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete {data.name}?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDeleteDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
