import { InputWithLabel } from "@/components/main/InputWithLabel";
import MainSelect from "@/components/main/MainSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMainLayoutContext } from "@/contexts/MainLayoutContext";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import { useUsersContext } from "@/contexts/UsersContext";
import clsx from "clsx";
import React from "react";
import { FiUpload } from "react-icons/fi";

const ModalUser = () => {
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

  const { userMe } = useMainLayoutContext();
  //   const optionsTypeExport = ["currMonth", "prevMonth"];
  const optionsRole = [
    "employee",
    userMe?.role !== "manager" && "manager",
  ].filter((item) => item);

  return (
    <Dialog open={openModal} onOpenChange={() => handleCloseModal()}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader className={"gap-2"}>
          <DialogTitle>
            {isEdit ? "Edit User" : isDetail ? "Detail User" : "Add User"}
          </DialogTitle>
        </DialogHeader>
        <div className="size-full grid grid-cols-2 gap-4 px-2 overflow-auto">
          <div className="size-full flex flex-col gap-3">
            <InputWithLabel
              label={"Fullname"}
              placeholder={"John Doe"}
              inputProps={{
                className: "bg-primary-white-100",
                value: fullName,
                onChange: (e) => setFullName(e.target.value),
                readOnly: isDetail,
              }}
            />
            <MainSelect
              label={"Role"}
              placeholder={"Select Role"}
              options={optionsRole}
              value={role}
              onChange={setRole}
              trigerProps={{
                className: "bg-primary-white-100 h-[36px] !border-2 capitalize",
                disabled: isDetail,
              }}
            />
            <InputWithLabel
              label={"Username"}
              placeholder={"johndoe"}
              inputProps={{
                className: "bg-primary-white-100",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                readOnly: isDetail,
              }}
            />
            {!isDetail && (
              <InputWithLabel
                label={"Password"}
                placeholder={"**********"}
                inputProps={{
                  className: "bg-primary-white-100",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  type: "password",
                }}
              />
            )}
            <InputWithLabel
              label={"Whatsapp Number"}
              placeholder={"081234567890"}
              inputProps={{
                className: "bg-primary-white-100",
                value: contactNumber,
                onChange: (e) => setContactNumber(e.target.value),
                readOnly: isDetail,
              }}
            />
          </div>
          <div className="size-full relative">
            <div className="absolute top-0 left-0 w-[60%] flex">
              <div className="flex flex-col gap-3 size-full">
                <div className="text-[14px] leading-none font-medium">
                  Photo Profile
                </div>
                {typeof photo === "string" && isDetail ? (
                  <img
                    src={photo}
                    alt=""
                    className="w-full aspect-square object-cover"
                  />
                ) : (
                  <>
                    <label
                      htmlFor="receipt"
                      className="cursor-pointer w-full aspect-square border border-dashed flex flex-col text-[12px] p-2"
                    >
                      <FiUpload className="size-[50%] m-auto text-primary-white-400" />
                      <div className="text-black/50 pb-1 text-center">
                        {photo?.name || "Upload Photo"}
                      </div>
                      <div
                        type="submit"
                        className="py-1.5 px-3 rounded-md bg-primary-green-100 text-white w-fit mx-auto"
                      >
                        Select File
                      </div>
                    </label>
                    <input
                      type="file"
                      id="receipt"
                      className="hidden"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      accept="image/*"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="h-fit w-full flex flex-col gap-3">
            {isDetail ? null : (
              <Button
                onClick={isEdit ? handleEditUser : handleCreateUser}
                className={clsx(
                  "hover:!bg-primary-green-100 hover:!text-white"
                )}
              >
                {isEdit ? "Edit User" : "Add User"}
              </Button>
            )}
            <Button
              onClick={handleCloseModal}
              className="!border-primary-green-100 !border !text-primary-green-100 !bg-white"
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUser;
