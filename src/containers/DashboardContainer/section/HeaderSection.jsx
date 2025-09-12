import React, { useEffect } from "react";
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
import MonthlyReportPDF from "@/components/main/MonthlyReportPDF";

const HeaderSection = () => {
  const {
    openReport,
    setOpenReport,
    typeReport,
    setTypeReport,
    typeExport,
    setTypeExport,
    handleOpenReport,
    handleCloseReport,
    handleDownloadReport,
    handleGetTotalIncome,
    handleGetTotalTransaction,
    handleGetTotalCost,
    handleGetTotalExpense,
    handleGetDailyTransaction,
    handleGetHighestEarning,
    handleGetHighestExpense,
    handleGetTopClients,
    filterTotalIncome,
    setFilterTotalIncome,
    filterTotalTransaction,
    setFilterTotalTransaction,
    filterTotalCost,
    setFilterTotalCost,
    filterTotalExpense,
    setFilterTotalExpense,
    filterTypeDailyTransaction,
    setFilterTypeDailyTransaction,
    filterTimeDailyTransaction,
    setFilterTimeDailyTransaction,
    filterHighestEarning,
    setFilterHighestEarning,
    filterHighestExpense,
    setFilterHighestExpense,
    totalIncomeData,
    setTotalIncomeData,
    loadingTotalIncome,
    setLoadingTotalIncome,
    totalTransactionData,
    setTotalTransactionData,
    loadingTotalTransaction,
    setLoadingTotalTransaction,
    totalCostData,
    setTotalCostData,
    loadingTotalCost,
    setLoadingTotalCost,
    totalExpenseData,
    setTotalExpenseData,
    loadingTotalExpense,
    setLoadingTotalExpense,
    dailyTransactionData,
    setDailyTransactionData,
    loadingDailyTransaction,
    setLoadingDailyTransaction,
    highestEarningData,
    setHighestEarningData,
    loadingHighestEarning,
    setLoadingHighestEarning,
    highestExpenseData,
    setHighestExpenseData,
    loadingHighestExpense,
    setLoadingHighestExpense,
    topClients,
    setTopClients,
    loadingTopClients,
    setLoadingTopClients,
    handleGetPdfReport,
    loadingReport,
    dataReport,
    setDataReport,
  } = useDashboardContext();

  const optionsTypeReport = ["income", "outcome"];
  const optionsTypeExport = ["currMonth", "prevMonth"];

  useEffect(() => {
    if (dataReport && !loadingReport) {
      setDataReport(null);
    }
  }, [dataReport]);

  return (
    <div className="h-[42px] w-full shrink-0 flex justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-fit my-auto">
            <Button variant="secondary" className="rounded-md py-1">
              <div className="flex gap-2 items-center">
                <div>Create Report</div>
                <ReportSvg />
              </div>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className={"gap-2"}>
            <DialogTitle>Download Report</DialogTitle>
            <div className="flex gap-3 [&_button]:py-2">
              <MainSelect
                label="Type Report"
                options={optionsTypeReport}
                onChange={setTypeReport}
                value={typeReport}
              />
              <MainSelect
                label="Type Export"
                options={optionsTypeExport}
                onChange={setTypeExport}
                value={typeExport}
              />
            </div>
            <div className="flex gap-3">
              <Button className="w-full" onClick={handleDownloadReport}>
                Download Excel
              </Button>
              <Button className="w-full" onClick={handleGetPdfReport}>
                Download PDF
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <MiniProfile />
      {!loadingReport && dataReport && <MonthlyReportPDF data={dataReport} title="Monthly Report" />}
    </div>
  );
};

export default HeaderSection;
