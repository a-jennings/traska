import React, { ReactElement } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CharacterData } from "../../types";
import axios from "axios";

type EditCharacterDialogProps = {
  onClose: () => void;
  data: CharacterData;
};

export function EditCharacterDialog(
  props: EditCharacterDialogProps
): ReactElement {
  const { onClose, data } = props;

  return (
    <>
      <DialogTitle>Edit Character</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={data}
          onSubmit={(values) => {
            axios.post("http://localhost:3001/character", values).then(() => {
              onClose();
            });
          }}
        >
          {({ values, handleSubmit }) => (
            <Form>
              <Field id="name" name="name" />
              <Field id="player" name="player" />
              <Field id="race" name="race" />
              <Field id="alignment" name="alignment" />
              <Field id="deity" name="deity" />
              <Field id="size" name="size" />
              <Field id="age" name="age" />
              <Field id="gender" name="gender" />
              <Field id="height" name="height" />
              <Field id="weight" name="weight" />
              <Field id="eyes" name="eyes" />
              <Field id="hair" name="hair" />
              <Field id="skin" name="skin" />

              <Button onClick={onClose}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}
