import { apiChangePassword } from "@/services/profileService";
import { handleLogout } from "@/utils/logout";
import { closeSwalLoading, swalLoading } from "@/utils/swalUtils";
import React from "react";

const ProfileContext = React.createContext();

export const useProfileContext = () => React.useContext(ProfileContext);

const ProfileContextProvider = ({ children }) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [openChangePassword, setOpenChangePassword] = React.useState(false);

  const onLogout = () => handleLogout();
  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
    setOldPassword("");
    setNewPassword("");
  };
  const handleChangePassword = async () => {
    swalLoading();
    try {
      await apiChangePassword(oldPassword, newPassword);
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };

  const valueContext = {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    openChangePassword,
    setOpenChangePassword,
    handleOpenChangePassword,
    handleCloseChangePassword,
    handleChangePassword,
    onLogout,
  };

  return (
    <ProfileContext.Provider value={valueContext}>{children}</ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
