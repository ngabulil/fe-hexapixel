import { ReportSvg, WhatsappSvg } from "@/assets/svg";
import TablePagination from "@/components/main/TablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIncomeContext } from "@/contexts/IncomeContext";
import { useMainLayoutContext } from "@/contexts/MainLayoutContext";
import { formatRibuan } from "@/utils/formatNumber";
import dayjs from "dayjs";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { swalConfirm } from "@/utils/swalUtils";

const TableIncome = () => {
  const {
    typeExport,
    setTypeExport,
    mode,
    setMode,
    price,
    setPrice,
    search,
    setSearch,
    item,
    setItem,
    quantity,
    setQuantity,
    customerName,
    setCustomerName,
    whatsapp,
    setWhatsapp,
    itemOptions,
    setItemOptions,
    tableFixed,
    setTableFixed,
    tableHistory,
    setTableHistory,
    paginationHistory,
    setPaginationHistory,
    selectedRow,
    setSelectedRow,
    totalPrice,
    setTotalPrice,
    loadingInput,
    loadingTableFixed,
    loadingTableHistory,
    handleSetMode,
    handleSetModeEdit,
    setOpenReport,
    handleDownloadReportIncome,
    handleCreateIncome,
    handleGetItemOptions,
    handleGetTableFixed,
    handleGetTableHistory,
    handleDeleteIncome,
    handleEditIncome,
    handleCreateItem,
  } = useIncomeContext();
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
      thClassName: "!w-[14%]",
    },
    {
      id: "item",
      header: "Item",
      accessor: "item",
      cell: ({ value }) => <span>{value?.name}</span>,
      thClassName: "!w-[10%]",
    },
    {
      id: "qty",
      header: "Qty",
      accessor: "quantity",
      cell: ({ value }) => <span>{value}</span>,
      thClassName: "!w-[5%]",
    },
    {
      id: "price",
      header: "Price (Rp)",
      accessor: "price",
      cell: ({ value }) => <span>{formatRibuan(value)}</span>,
      thClassName: "!w-[10%]",
    },
    {
      id: "totalPrice",
      header: "Total Price",
      accessor: "totalPrice",
      cell: ({ value }) => <span>{formatRibuan(value)}</span>,
      thClassName: "!w-[10%]",
    },
    {
      id: "customerName",
      header: "Customer",
      accessor: "customerName",
      cell: ({ value }) => (
        <span className="w-full truncate block">{value}</span>
      ),
      thClassName: "!w-[15%]",
    },
    {
      id: "whatsapp",
      header: "Contact",
      accessor: "whatsapp",
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
      thClassName: "!w-[9%] !text-center",
    },
    {
      id: "createdBy",
      header: "Created By",
      accessor: "createdBy",
      cell: ({ value }) => (
        <span className="w-full truncate block">{value?.fullName}</span>
      ),
      thClassName: "!w-[15%]",
    },
    {
      id: "id",
      header: "Action",
      accessor: "id",
      cell: ({ value, row }) => {
        const userIncome = row?.createdBy?._id === userMe?._id;

        return (
          <div className="flex gap-2">
            {userIncome ? (
              <>
                <button
                  className="size-[24px] shrink-0 flex"
                  onClick={() => handleSetModeEdit(row)}
                >
                  <AiFillEdit className="size-full text-primary-yellow-100" />
                </button>
                <button
                  className="size-[24px] shrink-0 flex"
                  onClick={() =>
                    swalConfirm(
                      () => handleDeleteIncome(value),
                      "Are you sure you want to delete this income ?"
                    )
                  }
                >
                  <MdDeleteForever className="size-full text-primary-orange-100" />
                </button>
              </>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    handleGetTableHistory();
  }, [search]);
  

  return (
    <div className="size-full flex flex-col bg-white rounded-md p-2">
      <div className="w-full p-3 flex justify-between items-center border-b">
        <div className="size-fit font-medium text-[21px]">History Income</div>
        <div className="size-fit flex gap-4 items-center">
          <Button
            variant="secondary"
            className="rounded-md h-fit py-1.5 px-3 text-[12px]"
            onClick={() => setOpenReport(true)}
          >
            <div className="flex gap-2 items-center">
              <div>Create Report</div>
              <ReportSvg />
            </div>
          </Button>
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
          data={tableHistory}
          fetchData={handleGetTableHistory}
          tableProps={{
            className: "table-fixed",
          }}
          pagination={paginationHistory}
          setPagination={setPaginationHistory}
          isLoading={loadingTableHistory}
        />
      </div>
    </div>
  );
};

export default TableIncome;
