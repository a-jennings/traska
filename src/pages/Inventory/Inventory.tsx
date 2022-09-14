import React, { ReactElement, useState, useEffect, Fragment } from "react";
import { Box, Grid, Typography, Divider, Fab, IconButton } from "@mui/material";
import axios from "axios";
import { Item } from "../../types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { InventoryAddDialog } from "./InventoryAddDialog/InventoryAddDialog";
import { InventoryDeleteDialog } from "./InventoryDeleteDialog/InventoryDeleteDialog";
import { InventoryEditDialog } from "./IventoryEditDialog/InventoryEditDialog";
import { Currency } from "./Currency/Currency";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function Inventory(): ReactElement {
  const [data, setData] = useState<Array<Item>>();
  const [selected, setSelected] = useState<Item>();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);
  const handleEditDialogOpen = (item: Item) => {
    setSelected(item);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setSelected(undefined);
    setEditDialogOpen(false);
  };
  const handleDeleteDialogOpen = (item: Item) => {
    setSelected(item);
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setSelected(undefined);
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/inventory")
      .then((res: { data: Array<Item> }) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [addDialogOpen, deleteDialogOpen, editDialogOpen]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Box py={3} px={20}>
        <Currency />
        <Grid container>
          <Grid item xs={10}>
            <Typography>Item Name</Typography>
          </Grid>
          <Grid item xs={1} textAlign="right">
            <Typography>Weight</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          {data?.map((item) => (
            <Fragment key={item.id}>
              <Grid item xs={10}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={1} textAlign="right">
                <Typography>{item.weight}</Typography>
              </Grid>
              <Grid item xs={1} textAlign="right">
                <IconButton
                  sx={{ width: 20, height: 20 }}
                  onClick={() => handleEditDialogOpen(item)}
                >
                  <EditIcon color="info" sx={{ width: 15, height: 15 }} />
                </IconButton>
                <IconButton
                  sx={{ width: 20, height: 20 }}
                  onClick={() => handleDeleteDialogOpen(item)}
                >
                  <DeleteIcon color="error" sx={{ width: 15, height: 15 }} />
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>

      <Fab
        sx={{ position: "absolute", bottom: 30, right: 30 }}
        color="primary"
        onClick={handleAddDialogOpen}
      >
        <AddIcon />
      </Fab>

      <InventoryAddDialog
        dialogOpen={addDialogOpen}
        onClose={handleAddDialogClose}
      />
      {selected && (
        <InventoryEditDialog
          item={selected}
          dialogOpen={editDialogOpen}
          onClose={handleEditDialogClose}
        />
      )}
      {selected && (
        <InventoryDeleteDialog
          item={selected}
          dialogOpen={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
        />
      )}
    </>
  );
}
