import React from "react";
import { Button } from "@/components/ui/button";
import { ReportSvg } from "@/assets/svg";
import { FaChevronDown } from "react-icons/fa6";
import ImgPlaceholder from "@/assets/image/placeholder.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MainSelect from "@/components/main/MainSelect";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { NavLink } from "react-router-dom";
import MiniProfile from "@/components/main/MiniProfile";
import clsx from "clsx";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import { useUsersContext } from "@/contexts/UsersContext";

const HeaderSection = () => {
  const {
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
    isDetail,
    setIsDetail,
    loadingTable,
    setLoadingTable,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalRow,
    handleGetTableUsers,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
  } = useUsersContext();

  return (
    <div className="h-[42px] w-full shrink-0 flex justify-between">
      <div className="size-full flex">
        <div className="w-[25%] shrink-0 flex gap-2">
          <Button
            onClick={handleOpenModal}
            className={clsx("w-full hover:!opacity-70", {
              "!bg-primary-black-400 !text-white": true,
            })}
          >
            Create User
          </Button>
        </div>
      </div>
      <MiniProfile />
    </div>
  );
};

export default HeaderSection;
