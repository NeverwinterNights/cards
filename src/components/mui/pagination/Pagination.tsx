import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function PaginationSize() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} size="small" shape="rounded" color="primary" />
    </Stack>
  );
}
