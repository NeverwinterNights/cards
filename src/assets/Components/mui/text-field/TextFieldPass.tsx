import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import s from "./TextFieldPass.module.scss";

export default function FormPropsTextFieldsPass() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "346px", margin: "0" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          className={s.textField}
          id="standard-password-input"
          label="Password"
          type="Password"
          autoComplete="current-password"
          variant="standard"
        />
      </div>
    </Box>
  );
}
