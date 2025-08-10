import { apiLogin } from "@/services/loginService";
import { closeSwalLoading, swalLoading, swalSuccess } from "@/utils/swalUtils";
import React from "react";

const LoginContext = React.createContext();

export const useLoginContext = () => React.useContext(LoginContext);

const LoginContextProvider = ({ children }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    swalLoading();
    try {
      const response = await apiLogin({ username, password });
      swalSuccess(response.message);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      closeSwalLoading();
    }
  };

  const valueContext = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };

  return (
    <LoginContext.Provider value={valueContext}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
