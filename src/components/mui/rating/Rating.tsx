import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#21268F",
  },
  "& .MuiRating-iconHover": {
    color: "#21268F",
  },
});

export default function CustomizedRating() {
  return (
    <Box
      sx={{
        "& > legend": { mt: 5 },
      }}
    >
      <StyledRating name="customized-5" defaultValue={5} max={5} size="small" />
    </Box>
  );
}
