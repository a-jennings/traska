import React, { ReactElement, Fragment, SetStateAction, Dispatch } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import axios from "axios";
import { SpellSlot } from "../../../types";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

type SpellHeaderProps = {
  data: Array<SpellSlot>;
  setData: Dispatch<SetStateAction<SpellSlot[] | undefined>>;
};

export function SpellHeader(props: SpellHeaderProps): ReactElement {
  const { data, setData } = props;

  const filteredData = data?.filter((slot) => slot.maxSlots !== 0);
  const theme = useTheme();

  const handleCastSpell = (spellSlot: SpellSlot) => {
    axios
      .patch(`http://localhost:3001/spellSlots/${spellSlot.id}`, {
        ...spellSlot,
        currentSlots: spellSlot.currentSlots - 1,
      })
      .then(() => {
        axios
          .get("http://localhost:3001/spellSlots")
          .then((res: { data: Array<SpellSlot> }) => setData(res.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  if (!data) {
    return <></>;
  }

  return (
    <Box
      width="100%"
      bgcolor={theme.palette.grey[300]}
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      my={1}
    >
      <Typography sx={{ opacity: 0.2 }}>|</Typography>
      {filteredData?.map((level, index) => (
        <Fragment key={index}>
          <Box py={1} textAlign="center">
            <Box>
              <Typography>Level: {level.level}</Typography>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ opacity: 0.8 }}>
                {level.currentSlots} / {level.maxSlots}
              </Typography>
              <IconButton
                disabled={!level.currentSlots}
                onClick={() => handleCastSpell(level)}
              >
                <AutoFixHighIcon
                  color={level.currentSlots ? "info" : "disabled"}
                />
              </IconButton>
            </Box>
          </Box>
          <Typography sx={{ opacity: 0.2 }}>|</Typography>
        </Fragment>
      ))}
    </Box>
  );
}
