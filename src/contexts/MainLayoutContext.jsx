import { apiGetProfile } from "@/services/profileService";
import { closeSwalLoading, swalLoading } from "@/utils/swalUtils";
import React from "react";

const MainLayoutContext = React.createContext();

export const useMainLayoutContext = () => React.useContext(MainLayoutContext);

const MainLayoutContextProvider = ({ children }) => {
  const [userMe, setUserMe] = React.useState(null);
  const [loadingUserMe, setLoadingUserMe] = React.useState(true);

  const handleGetUserLogin = async () => {
    swalLoading();
    try {
      const response = await apiGetProfile();
      setUserMe(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUserMe(false);
      closeSwalLoading();
    }
  };

  const valueContext = {
    userMe,
    setUserMe,
    loadingUserMe,
    setLoadingUserMe,
    handleGetUserLogin,
  };

  // if (loadingUserMe) {
  //   return null;
  // }

  return (
    <MainLayoutContext.Provider value={valueContext}>
      {children}
    </MainLayoutContext.Provider>
  );
};

export default MainLayoutContextProvider;
