import React from "react";
import HeaderSection from "./section/HeaderSection";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import CreateOutcome from "./section/FormOutcome";
import TableOutcome from "./section/TableOutcome";
import ModalReport from "./section/ModalReport";

const Outcome = () => {
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
    handleDownloadReportOutcome,
    handleCreateOutcome,
    handleGetItemOptions,
    handleGetTableFixed,
    handleGetTableHistory,
    handleDeleteOutcome,
    handleEditOutcome,
  } = useOutcomeContext();

  return (
    <div className="size-full flex flex-col gap-3">
      <HeaderSection />
      <div className="border-b border-black/20 w-full"></div>
      <div className="size-full pt-2 flex overflow-hidden">
        {["add", "edit"].includes(mode) ? (
          <CreateOutcome />
        ) : mode === "history" ? (
          <TableOutcome />
        ) : null}
      </div>
      <ModalReport />
    </div>
  );
};

export default Outcome;
