import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { SpecialAbilityData } from "../../types";
import { TurnUndeadTable } from "./TurnUndeadTable";
import { TurnUndeadText } from "./TurnUndeadText";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export function TurnUndead(): ReactElement {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState<Array<SpecialAbilityData>>();
  const [variant, setVariant] = useState<"turn" | "sacredBoost" | "sunDomain">(
    "turn"
  );

  const TurnUndeadUses = data?.find(
    (ability) => ability.name === "Turn Undead"
  );

  const sunDomainUses = data?.find(
    (ability) => ability.name === "Sun Domain Turn Undead"
  );

  const getDialogTitle = (): string => {
    if (variant === "turn") {
      return "Turn Undead";
    }
    if (variant === "sacredBoost") {
      return "Sacred Boost";
    }
    if (variant === "sunDomain") {
      return "Turn Undead Sun Domain";
    }
    return "";
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/specialAbilities")
      .then((res: { data: Array<SpecialAbilityData> }) => setData(res.data))
      .catch((error) => console.log(error));
  }, [dialogOpen]);

  const handleCastTurnUndead = () => {
    axios
      .patch(`http://localhost:3001/specialAbilities/${TurnUndeadUses?.id}`, {
        ...TurnUndeadUses,
        currentUses:
          TurnUndeadUses?.currentUses && TurnUndeadUses?.currentUses - 1,
      })
      .then(() => handleDialogClose())
      .catch((error) => console.log(error));
  };

  const handleCastSunDomain = () => {
    axios
      .patch(`http://localhost:3001/specialAbilities/${TurnUndeadUses?.id}`, {
        ...TurnUndeadUses,
        currentUses:
          TurnUndeadUses?.currentUses && TurnUndeadUses?.currentUses - 1,
      })
      .then(() => {
        axios
          .patch(
            `http://localhost:3001/specialAbilities/${sunDomainUses?.id}`,
            {
              ...sunDomainUses,
              currentUses:
                sunDomainUses?.currentUses && sunDomainUses?.currentUses - 1,
            }
          )
          .catch((error) => console.log(error));
      })
      .then(() => handleDialogClose())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Box my={2} mx={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box width="70%">
            <TurnUndeadText />
          </Box>
          <Box width="30%" ml={5}>
            <TurnUndeadTable />
            <Box mt={2} display="flex" flexDirection="column">
              {TurnUndeadUses && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginBottom: 1 }}
                  onClick={() => {
                    setVariant("turn");
                    handleDialogOpen();
                  }}
                  disabled={!TurnUndeadUses.currentUses}
                >
                  Turn Undead - {TurnUndeadUses.currentUses}/
                  {TurnUndeadUses.maxUses}
                </Button>
              )}

              {TurnUndeadUses && (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginBottom: 1 }}
                  onClick={() => {
                    setVariant("sacredBoost");
                    handleDialogOpen();
                  }}
                  disabled={!TurnUndeadUses.currentUses}
                >
                  Sacred Boost - {TurnUndeadUses.currentUses}/
                  {TurnUndeadUses.maxUses}
                </Button>
              )}

              {sunDomainUses && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setVariant("sunDomain");
                    handleDialogOpen();
                  }}
                  disabled={!sunDomainUses.currentUses}
                >
                  Sun Domain Turn Undead - {sunDomainUses.currentUses}/
                  {sunDomainUses.maxUses}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={
              variant === "turn"
                ? "secondary"
                : variant === "sacredBoost"
                ? "success"
                : "warning"
            }
            onClick={() =>
              variant === "sunDomain"
                ? handleCastSunDomain()
                : handleCastTurnUndead()
            }
          >
            {getDialogTitle()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
