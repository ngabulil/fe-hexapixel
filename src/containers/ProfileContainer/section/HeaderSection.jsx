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
import { useProfileContext } from "@/contexts/ProfileContext";
import { InputWithLabel } from "@/components/main/InputWithLabel";

const HeaderSection = () => {
  const {
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
  } = useProfileContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword();
  };

  return (
    <div className="h-[42px] w-full shrink-0 flex justify-between">
      <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
        <DialogTrigger asChild>
          <div className="w-fit my-auto">
            <Button variant="secondary" className="rounded-md py-1">
              <div className="flex gap-2 items-center">
                <div>Change Password</div>
              </div>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className={"pb-2"}>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <InputWithLabel
              label={"Old Password"}
              placeholder={"Old Password"}
              inputProps={{
                type: "password",
                value: oldPassword,
                onChange: (e) => setOldPassword(e.target.value),
                className: "bg-primary-white-100",
              }}
            />
            <InputWithLabel
              label={"New Password"}
              placeholder={"New Password"}
              inputProps={{
                type: "password",
                value: newPassword,
                onChange: (e) => setNewPassword(e.target.value),
                className: "bg-primary-white-100",
              }}
            />
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
      <MiniProfile />
    </div>
  );
};

export default HeaderSection;
