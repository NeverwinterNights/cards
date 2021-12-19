import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./TableListCard.module.scss";
import { styled } from "@mui/material/styles";

function createData(
  question: string,
  answer: string,
  last: number | string,
  grade: number | string,
  actions: number
) {
  return { question, answer, last, grade, actions };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
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
  createData(
    "How 'This' works in JavaScript?",
    "This is how 'This' works in JavaScript",
    "18.03.2021",
    "Ivan Ivanov",
    4.0
  ),
];

export default function DenseTableList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead className={s.tableHead}>
          <StyledTableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">Actions</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody className={s.tableBody}>
          {rows.map((row) => (
            <StyledTableRow
              key={row.question}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.question}
              </TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="right">{row.last}</TableCell>
              <TableCell align="right">{row.grade}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
