import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import s from "./TextFieldEmail.module.scss";

export default function FormPropsTextFieldsEmail() {
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
          label="Email"
          type="Email"
          autoComplete="current-password"
          variant="standard"
        />
      </div>
    </Box>
  );
}
