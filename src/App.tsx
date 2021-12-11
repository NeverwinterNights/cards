import React from "react";
import "./App.css";
// import { MyRoutes } from "./common/Components/MyRoutes/MyRoutes";
import AuthLogin from "./assets/Components/auth/auth-login/AuthLogin";
import ForgotPassword from "./assets/Components/auth/forgot-password/ForgotPassword";
import CheckEmail from "./assets/Components/auth/chek-email/CheckEmail";
import CreatNewPass from "./assets/Components/auth/creat-new-pass/CreatNewPass";

function App() {
  //   const vlas = "vlas";
  return (
    <>
      <AuthLogin />
      <ForgotPassword />
      <CheckEmail />
      <CreatNewPass />
    </>
  );
}

export default App;
