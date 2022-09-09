import React, { Dispatch, Fragment, ReactElement, SetStateAction } from "react";
import { SpellSlot } from "../../../../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";

type SpellMenuEditDialogProps = {
  data: Array<SpellSlot>;
  setData: Dispatch<SetStateAction<SpellSlot[] | undefined>>;
  dialogOpen: boolean;
  onClose: () => void;
};

export function SpellMenuEditDialog(
  props: SpellMenuEditDialogProps
): ReactElement {
  const { data, setData, dialogOpen, onClose } = props;

  return (
    <Dialog open={dialogOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Spell Slots</DialogTitle>
      <DialogContent>
        <Formik initialValues={data} onSubmit={() => {}}>
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <Grid container my={1} spacing={1}>
                {data.map((slot, i) => (
                  <Fragment key={i}>
                    <Grid item xs={4}>
                      <Typography>Level {slot.level}:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="currentSlot"
                        name="currentSlot"
                        label="Current Slots"
                        size="small"
                        value={slot.currentSlots}
                        onChange={handleChange}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Fragment>
                ))}
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
