import React, { ReactElement, useState } from "react";
import { Box, Typography, useTheme, IconButton, Collapse } from "@mui/material";
import { SpellData } from "../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

type SpellProps = {
  data: SpellData;
};

export function Spell(props: SpellProps): ReactElement {
  const { data } = props;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

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
      >
        <Box>
          <Typography>{data.spellName}</Typography>
        </Box>
        <Box>
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
          {data.spellDescription && (
            <Box mt={1}>
              <Typography>{data.spellDescription}</Typography>
            </Box>
          )}
          {data.spellDescriptionTwo && (
            <Box mt={1}>
              <Typography>{data.spellDescriptionTwo}</Typography>
            </Box>
          )}
          {data.spellDescriptionThree && (
            <Box mt={1}>
              <Typography>{data.spellDescriptionThree}</Typography>
            </Box>
          )}
          {data.spellDescriptionFour && (
            <Box mt={1}>
              <Typography>{data.spellDescriptionFour}</Typography>
            </Box>
          )}
        </Collapse>
      </Box>
    </>
  );
}
