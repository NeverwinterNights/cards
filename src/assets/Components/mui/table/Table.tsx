import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./Table.module.scss";
// import { styled } from "@mui/material/styles";

function createData(
  name: string,
  cards: number,
  last: number | string,
  created: number | string,
  actions: number
) {
  return { name, cards, last, created, actions };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td": {
    padding: 16,
  },
}));

const rows = [
  createData("Pack Name", 4, "18.03.2021", "Ivan Ivanov", 4.0),
  // createData("Name Pack", 37, "19.03.2021", "Petr Petrov", 4.3),
  // createData("Pack Name", 18, "19.03.2021", "Petr Petrov", 6.0),
  // createData("Name Pack", 0, "20.03.2021", "Ivan Ivanov", 4.3),
  // createData("Pack Name", 11, "20.03.2021", "Petr Petrov", 3.9),
  // createData("Name Pack", 9, "20.03.2021", "Ivan Ivanov", 3.9),
  // createData("Pack Name", 8, "21.03.2021", "Petr Petrov", 3.9),
  // createData("Name Pack", 0, "21.03.2021", "Ivan Ivanov", 3.9),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead className={s.tableHead}>
          <StyledTableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody className={s.tableBody}>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cards}</TableCell>
              <TableCell align="right">{row.last}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
