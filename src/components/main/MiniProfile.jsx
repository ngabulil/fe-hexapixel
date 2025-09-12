import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import ImgPlaceholder from "../../assets/image/placeholder.png";
import { handleLogout } from "@/utils/logout";
import { useMainLayoutContext } from "@/contexts/MainLayoutContext";

const MiniProfile = () => {
  const {
    userMe,
    setUserMe,
    loadingUserMe,
    setLoadingUserMe,
    handleGetUserLogin,
  } = useMainLayoutContext();

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="w-fit h-full min-w-[180px] rounded-full p-1 flex items-center gap-8 justify-between bg-white cursor-pointer">
          <div className="flex items-center gap-2">
            <img
              className="size-[30px] rounded-full shrink-0"
              src={userMe?.photo || ImgPlaceholder}
              onError={(e) => {
                e.target.src = ImgPlaceholder;
              }}
              alt=""
            />
            <div className="flex flex-col leading-none gap-0.5 text-left">
              <div className="text-[11px] text-primary-black-200">
                {userMe?.fullName}
              </div>
              <div className="text-[10px] text-primary-white-200">
                {userMe?.username}
              </div>
            </div>
          </div>
          <div className="pr-2">
            <FaChevronDown className="text-primary-white-200 size-[12px]" />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-white min-w-[180px]">
        <div className="flex flex-col gap-2 text-[12px]">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-white bg-primary-green-100"
                  : "text-primary-green-100"
              } text-center hover:opacity-70 py-1 rounded-md`
            }
          >
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-1 rounded-md hover:opacity-70"
          >
            Logout
          </button>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default MiniProfile;
