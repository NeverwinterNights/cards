import React from "react";
import "./App.css";
// import { MyRoutes } from "./common/Components/MyRoutes/MyRoutes";
import AuthLogin from "./assets/Components/auth/auth-login/AuthLogin";
import ForgotPassword from "./assets/Components/auth/forgot-password/ForgotPassword";

function App() {
  //   const vlas = "vlas";
  return (
    <>
      <AuthLogin />
      <ForgotPassword />
    </>
  );
}

export default App;
