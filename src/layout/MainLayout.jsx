import {
  DashboardSvg,
  IncomeSvg,
  InfoSvg,
  LogoSvg,
  OutcomeSvg,
  UserSvg,
} from "@/assets/svg";
import MainLoading from "@/components/main/MainLoading";
import { useMainLayoutContext } from "@/contexts/MainLayoutContext";
import clsx from "clsx";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  const {
    userMe,
    setUserMe,
    loadingUserMe,
    setLoadingUserMe,
    handleGetUserLogin,
  } = useMainLayoutContext();
  const LinksOptions = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardSvg />,
    },
    {
      name: "Income",
      path: "/income",
      icon: <IncomeSvg />,
    },
    {
      name: "Outcome",
      path: "/outcome",
      icon: <OutcomeSvg />,
    },
    {
      name: "User Management",
      path: "/user",
      icon: <UserSvg />,
      isHide: userMe?.role === "employee",
    },
    {
      name: "Info",
      path: "/info",
      icon: <InfoSvg />,
    },
  ].filter((link) => !link.isHide);

  React.useEffect(() => {
    if (!userMe) handleGetUserLogin();
  }, [userMe]);

  if (loadingUserMe) return <MainLoading />;

  return (
    <div className="size-full flex">
      <div className="w-[17.5%] h-full shrink-0 flex flex-col bg-primary-black-100 p-2 gap-3">
        <div className="flex gap-2 items-center w-full">
          <LogoSvg className="size-[42px]" />
          <div className="text-white font-medium text-[20px]">Hexapixel</div>
        </div>
        <div className="border-b border-white/15"></div>
        <div className="w-full flex flex-col gap-2 pt-2">
          {LinksOptions.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                clsx("px-2 py-3 rounded-sm", {
                  "bg-primary-green-100": isActive,
                })
              }
            >
              <div className="w-full flex gap-2 items-center">
                {link.icon}
                <div className="text-white font-medium text-[14px]">
                  {link.name}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="size-full flex bg-primary-white-100 p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
