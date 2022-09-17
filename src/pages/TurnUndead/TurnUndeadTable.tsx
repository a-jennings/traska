import React, { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";

function createData(result: string, undeadAffected: string) {
  return { result, undeadAffected };
}

const rows = [
  createData("0 or lower", "Cleric's level -4"),
  createData("1-3", "Cleric's level -3"),
  createData("4-6", "Cleric's level -2"),
  createData("7-9", "Cleric's level -1"),
  createData("10-12", "Cleric's level"),
  createData("13-15", "Cleric's level +1"),
  createData("16-18", "Cleric's level +2"),
  createData("19-21", "Cleric's level +3"),
  createData("22 or higher", "Cleric's level +4"),
];

export function TurnUndeadTable(): ReactElement {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[400] }}>
            <TableCell
              sx={{
                borderRight: "1px solid",
                borderColor: theme.palette.grey[300],
                fontWeight: "bold",
              }}
            >
              Turning Check Result
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Most Powerful Undead Affected (Maximum Hit Dice)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": {
                  borderBottom: 0,
                  borderRight: "1px solid",
                  borderColor: theme.palette.grey[300],
                },
                backgroundColor:
                  index % 2 ? theme.palette.grey[200] : "transparent",
              }}
            >
              <TableCell
                sx={{
                  borderRight: "1px solid",
                  borderColor: theme.palette.grey[300],
                }}
              >
                {row.result}
              </TableCell>
              <TableCell>{row.undeadAffected}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
