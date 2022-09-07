import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { CharacterData } from "../../types";
import { Box, Typography, Button, Dialog } from "@mui/material";
import { EditCharacterDialog } from "./EditCharacterDialog";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Character(): ReactElement {
  const [data, setData] = useState<CharacterData>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/character")
      .then((res: { data: CharacterData }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen]);

  return (
    <Box p={3}>
      <Box mb={1}>
        <Typography>Name: {data?.name}</Typography>
        <Box display="flex">
          <Typography>Class: </Typography>
          {data?.classes.map((cl, i) => (
            <Typography key={i}>
              {cl.class} {cl.level}
            </Typography>
          ))}
        </Box>

        <Typography>Player: {data?.player}</Typography>
        <Typography>Race: {data?.race}</Typography>
        <Typography>Alignment: {data?.alignment}</Typography>
        <Typography>Deity: {data?.deity}</Typography>
        <Typography>Size: {data?.size}</Typography>
        <Typography>Age: {data?.age}</Typography>
        <Typography>Gender: {data?.gender}</Typography>
        <Typography>Height: {data?.height}</Typography>
        <Typography>Weight: {data?.weight}</Typography>
        <Typography>Eyes: {data?.eyes}</Typography>
        <Typography>Hair: {data?.hair}</Typography>
        <Typography>Skin: {data?.skin}</Typography>
      </Box>

      <Button variant="outlined" size="small" onClick={handleDialogOpen}>
        Edit
      </Button>

      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        {data && (
          <EditCharacterDialog onClose={handleDialogClose} data={data} />
        )}
      </Dialog>
    </Box>
  );
}
