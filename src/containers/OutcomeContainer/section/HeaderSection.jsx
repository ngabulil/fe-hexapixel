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

const HeaderSection = () => {
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
  } = useOutcomeContext();

  return (
    <div className="h-[42px] w-full shrink-0 flex justify-between">
      <div className="size-full flex">
        <div className="w-[50%] shrink-0 flex gap-2">
          <Button
            onClick={() => handleSetMode("add")}
            className={clsx("w-full hover:!opacity-70", {
              "!bg-primary-black-400 !text-white": mode === "add",
              "!bg-white !text-primary-black-400 border border-primary-black-400":
                mode !== "add",
            })}
          >
            Create Outcome
          </Button>
          <Button
            onClick={() => handleSetMode("history")}
            className={clsx("w-full hover:!opacity-70", {
              "!bg-primary-black-400 !text-white": mode === "history",
              "!bg-white !text-primary-black-400 border border-primary-black-400":
                mode !== "history",
            })}
          >
            History Outcome
          </Button>
        </div>
      </div>
      <MiniProfile />
    </div>
  );
};

export default HeaderSection;
