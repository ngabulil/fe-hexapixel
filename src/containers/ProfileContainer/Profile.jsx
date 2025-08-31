import React from "react";
import HeaderSection from "./section/HeaderSection";
import { useMainLayoutContext } from "@/contexts/MainLayoutContext";

const Profile = () => {
  const {
    userMe,
    setUserMe,
    loadingUserMe,
    setLoadingUserMe,
    handleGetUserLogin,
  } = useMainLayoutContext();

  return (
    <div className="size-full flex flex-col gap-3">
      <HeaderSection />
      <div className="border-b border-black/20 w-full"></div>
      <div className="mt-2 flex flex-col gap-4 size-full p-4 bg-white rounded-xl overflow-hidden">
        <h1 className="text-2xl font-semibold">Profile User</h1>
        <div className="flex size-full gap-4">
          <div className="w-[25%] h-fit aspect-square shrink-0">
            <img src={userMe?.photo} className="size-full" alt="" />
          </div>
          <div className="size-full flex flex-col gap-2">
            <div className="w-fit flex flex-col gap-1">
              <div>Name :</div>
              <div className="font-semibold">{userMe?.fullName}</div>
            </div>
            <div className="w-fit flex flex-col gap-1">
              <div>Username :</div>
              <div className="font-semibold">{userMe?.username}</div>
            </div>
            <div className="w-fit flex flex-col gap-1">
              <div>Role :</div>
              <div className="font-semibold">{userMe?.role}</div>
            </div>
            <div className="w-fit flex flex-col gap-1">
              <div>Contact Number :</div>
              <div className="font-semibold">{userMe?.contactNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
