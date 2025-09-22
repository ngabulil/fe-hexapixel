import { ReportSvg, WhatsappSvg } from "@/assets/svg";
import TablePagination from "@/components/main/TablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import { useMainLayoutContext } from "@/contexts/MainLayoutContext";
import { formatRibuan } from "@/utils/formatNumber";
import dayjs from "dayjs";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { swalConfirm } from "@/utils/swalUtils";
import { IoReceipt } from "react-icons/io5";
import { useUsersContext } from "@/contexts/UsersContext";
import { FaEye } from "react-icons/fa";

const TableUsers = () => {
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
  const columns = [
    {
      id: "createdAt",
      header: "Date",
      accessor: "createdAt",
      cell: ({ value }) => (
        <span className="w-full truncate block">
          {dayjs(value).format("DD/MM/YYYY HH:mm")}
        </span>
      ),
      thClassName: "!w-[20%]",
    },
    {
      id: "fullName",
      header: "Name",
      accessor: "fullName",
      cell: ({ value }) => <span>{value}</span>,
      thClassName: "!w-[20%]",
    },

    {
      id: "username",
      header: "Username",
      accessor: "username",
      cell: ({ value }) => <span>{value}</span>,
      thClassName: "!w-[20%]",
    },
    {
      id: "role",
      header: "Role",
      accessor: "role",
      cell: ({ value }) => <span className="capitalize">{value}</span>,
      thClassName: "!w-[10%]",
    },
    {
      id: "contactNumber",
      header: "Contact",
      accessor: "contactNumber",
      cell: ({ value }) => (
        <a
          href={`https://wa.me/62${value.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <WhatsappSvg />
        </a>
      ),
      thClassName: "!w-[8%] !text-center",
    },
    {
      id: "photo",
      header: "Photo",
      accessor: "photo",
      cell: ({ value }) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <img className="size-[24px]" src={value} alt="" />
        </a>
      ),
      thClassName: "!w-[8%] !text-center",
    },
    {
      id: "id",
      header: "Action",
      accessor: "id",
      cell: ({ value, row }) => {
        return (
          <div className="flex gap-2">
            <>
              <button
                className="size-[24px] shrink-0 flex"
                onClick={() => handleOpenModalRow(row, "detail")}
              >
                <FaEye className="size-full text-primary-green-100" />
              </button>
              {userMe.role !== "employee" && (
                <>
                  <button
                    className="size-[24px] shrink-0 flex"
                    onClick={() => handleOpenModalRow(row, "edit")}
                  >
                    <AiFillEdit className="size-full text-primary-yellow-100" />
                  </button>
                  <button
                    className="size-[24px] shrink-0 flex"
                    onClick={() =>
                      swalConfirm(
                        () => handleDeleteUser(value),
                        "Are you sure you want to delete this user ?"
                      )
                    }
                  >
                    <MdDeleteForever className="size-full text-primary-orange-100" />
                  </button>
                </>
              )}
            </>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    handleGetTableUsers();
  }, [search]);

  return (
    <div className="size-full flex flex-col bg-white rounded-md p-2">
      <div className="w-full p-3 flex justify-between items-center border-b">
        <div className="size-fit font-medium text-[21px]">User Management</div>
        <div className="size-fit flex gap-4 items-center">
          <div className="border flex gap-2 items-center p-[5px] rounded-lg">
            <IoIosSearch className="shrink-0 size-[20px]" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search"
              className="border-none bg-transparent shadow-none p-0 h-auto !text-[12px] focus-visible:!outline-none focus-visible:!ring-0"
            />
          </div>
        </div>
      </div>
      <div className="size-full overflow-hidden flex p-3">
        <TablePagination
          columns={columns}
          data={usersTable}
          fetchData={handleGetTableUsers}
          tableProps={{
            className: "table-fixed",
          }}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={loadingTable}
        />
      </div>
    </div>
  );
};

export default TableUsers;
