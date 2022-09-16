import React, { ReactElement, useState } from "react";
import { NoteData } from "../../types";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Button,
} from "@mui/material";
import { formatDateTime } from "../../formatting";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { TextEditor } from "../../components/TextEditor/TextEditor";

type NoteProps = {
  data: NoteData;
};

export function Note(props: NoteProps): ReactElement {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);

  const createdDate = new Date(data.date);
  const editedDate = data.editDate && new Date(data.editDate);

  return (
    <>
      <Box sx={{ boxShadow: 2, borderRadius: 1 }} py={1} px={3} mb={1}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography>{data.title}</Typography>
            <Box ml={2}>
              <Typography fontSize="12px" sx={{ opacity: 0.5 }}>
                Created: {formatDateTime(createdDate)}
              </Typography>
            </Box>

            {editedDate && (
              <Box ml={2}>
                <Typography fontSize="12px" sx={{ opacity: 0.5 }}>
                  Edited: {formatDateTime(editedDate)}
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <CloseIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expanded}>
          {expanded && <Divider />}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {!edit && (
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: data.text }}
              />
            )}
            {edit && (
              <Box my={1} flex="1">
                <TextEditor onChange={(value) => console.log(value)} />
              </Box>
            )}

            {!edit && (
              <IconButton color="info">
                <EditIcon onClick={() => setEdit(true)} />
              </IconButton>
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            {edit && (
              <Button variant="contained" onClick={() => setEdit(false)}>
                Close
              </Button>
            )}
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
