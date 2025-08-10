import Login from "@/containers/LoginContainer/Login";
import LoginContextProvider from "@/contexts/LoginContext";
import React from "react";

const LoginPage = () => {
  return (
    <LoginContextProvider>
      <Login />
    </LoginContextProvider>
  );
};

export default LoginPage;
