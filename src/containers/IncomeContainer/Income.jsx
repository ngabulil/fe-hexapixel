import React from "react";
import HeaderSection from "./section/HeaderSection";
import { useIncomeContext } from "@/contexts/IncomeContext";
import CreateIncome from "./section/FormIncome";
import TableIncome from "./section/TableIncome";
import ModalReport from "./section/ModalReport";

const Income = () => {
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
    handleDownloadReportIncome,
    handleCreateIncome,
    handleGetItemOptions,
    handleGetTableFixed,
    handleGetTableHistory,
    handleDeleteIncome,
    handleEditIncome,
  } = useIncomeContext();

  return (
    <div className="size-full flex flex-col gap-3">
      <HeaderSection />
      <div className="border-b border-black/20 w-full"></div>
      <div className="size-full pt-2 flex overflow-hidden">
        {["add", "edit"].includes(mode) ? (
          <CreateIncome />
        ) : mode === "history" ? (
          <TableIncome />
        ) : null}
      </div>
      <ModalReport />
    </div>
  );
};

export default Income;
