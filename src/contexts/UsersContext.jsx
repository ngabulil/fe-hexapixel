import {
  apiCreateUser,
  apiDeleteUser,
  apiGetAllUsers,
  apiUpdateUser,
} from "@/services/userService";
import { closeSwalLoading, swalLoading, swalSuccess } from "@/utils/swalUtils";
import React from "react";

const UsersContext = React.createContext();

export const useUsersContext = () => React.useContext(UsersContext);

const UsersContextProvider = ({ children }) => {
  const [usersTable, setUsersTable] = React.useState([]);
  const [pagination, setPagination] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [role, setRole] = React.useState("employee");
  const [photo, setPhoto] = React.useState(null);
  const [loadingTable, setLoadingTable] = React.useState(true);

  const resetInput = () => {
    setUsername("");
    setPassword("");
    setFullName("");
    setContactNumber("");
    setRole("employee");
    setPhoto(null);
    setSelectedRow(null);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    resetInput();
  };
  const handleOpenModalEdit = (row) => {
    setSelectedRow(row);
    setIsEdit(true);
    setOpenModal(true);
    setUsername(row.username);
    setPassword(row.password);
    setFullName(row.fullName);
    setContactNumber(row.contactNumber);
    setRole(row.role);
    setPhoto(row.photo);
  };
  const handleGetTableUsers = async (params) => {
    setLoadingTable(true);
    try {
      const formatParams = {
        ...(pagination && pagination.queryParams),
        ...(search && { search }),
        ...params,
      };
      const res = await apiGetAllUsers(formatParams);
      setUsersTable(res.result);
      setPagination(res.pagination);
      setLoadingTable(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTable(false);
    }
  };
  const handleCreateUser = async () => {
    swalLoading();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("fullName", fullName);
      formData.append("contactNumber", contactNumber);
      formData.append("role", role);
      formData.append("photo", photo);
      await apiCreateUser(formData);
      await handleGetTableUsers();
      swalSuccess("User successfully added!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleDeleteUser = async (id) => {
    swalLoading();
    try {
      await apiDeleteUser(id);
      await handleGetTableUsers();
      swalSuccess("User successfully deleted!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleEditUser = async () => {
    swalLoading();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("fullName", fullName);
      formData.append("contactNumber", contactNumber);
      formData.append("role", role);
      if (photo instanceof File) {
        formData.append("photo", photo);
      }
      await apiUpdateUser(selectedRow.id, formData);
      await handleGetTableUsers();
      swalSuccess("User successfully updated!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };

  const valueContext = {
    usersTable,
    setUsersTable,
    pagination,
    setPagination,
    search,
    setSearch,
    openModal,
    setOpenModal,
    isEdit,
    setIsEdit,
    selectedRow,
    setSelectedRow,
    username,
    setUsername,
    password,
    setPassword,
    fullName,
    setFullName,
    contactNumber,
    setContactNumber,
    role,
    setRole,
    photo,
    setPhoto,
    loadingTable,
    setLoadingTable,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalEdit,
    handleGetTableUsers,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
  };

  return (
    <UsersContext.Provider value={valueContext}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
