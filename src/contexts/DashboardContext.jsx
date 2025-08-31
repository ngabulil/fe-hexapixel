import {
  apiGetDailySummaryChart,
  apiGetIncomeCountSummary,
  apiGetIncomeSummary,
  apiGetLatestClientIncome,
  apiGetOutcomeCountSummary,
  apiGetOutcomeSummary,
  apiGetTopItemsIncomeSummary,
  apiGetTopItemsOutcomeSummary,
} from "@/services/dashboardService";
import { apiExportIncome } from "@/services/incomeService";
import { apiExportOutcomesByMonth } from "@/services/outcomeService";
import { closeSwalLoading, swalLoading, swalSuccess } from "@/utils/swalUtils";
import React from "react";

const DashboardContext = React.createContext();
export const useDashboardContext = () => React.useContext(DashboardContext);

const DashboardContextProvider = ({ children }) => {
  const [openReport, setOpenReport] = React.useState(false);
  const [typeReport, setTypeReport] = React.useState("income"); // income | outcome
  const [typeExport, setTypeExport] = React.useState("currMonth"); // currMonth | prevMonth
  const [filterTotalIncome, setFilterTotalIncome] = React.useState("today"); // today | 7days | 30days
  const [totalIncomeData, setTotalIncomeData] = React.useState(null);
  const [filterTotalTransaction, setFilterTotalTransaction] =
    React.useState("3days"); // 3days | 7days | 30days
  const [totalTransactionData, setTotalTransactionData] = React.useState(null);
  const [filterTotalCost, setFilterTotalCost] = React.useState("today"); // today | 7days | 30days
  const [totalCostData, setTotalCostData] = React.useState(null);
  const [filterTotalExpense, setFilterTotalExpense] = React.useState("3days"); // 3days | 7days | 30days
  const [totalExpenseData, setTotalExpenseData] = React.useState(null);
  const [filterTimeDailyTransaction, setFilterTimeDailyTransaction] =
    React.useState(7); // 7 | 14 | 30
  const [filterTypeDailyTransaction, setFilterTypeDailyTransaction] =
    React.useState("income"); // income | outcome
  const [dailyTransactionData, setDailyTransactionData] = React.useState(null);
  const [filterHighestEarning, setFilterHighestEarning] = React.useState("today"); // today | 7days | 30days
  const [highestEarningData, setHighestEarningData] = React.useState(null);
  const [filterHighestExpense, setFilterHighestExpense] = React.useState("today"); // today | 7days | 30days
  const [highestExpenseData, setHighestExpenseData] = React.useState(null);
  const [topClients, setTopClients] = React.useState([]);
  const [loadingTotalIncome, setLoadingTotalIncome] = React.useState(true);
  const [loadingTotalTransaction, setLoadingTotalTransaction] =
    React.useState(true);
  const [loadingTotalCost, setLoadingTotalCost] = React.useState(true);
  const [loadingTotalExpense, setLoadingTotalExpense] = React.useState(true);
  const [loadingDailyTransaction, setLoadingDailyTransaction] =
    React.useState(true);
  const [loadingHighestEarning, setLoadingHighestEarning] =
    React.useState(true);
  const [loadingHighestExpense, setLoadingHighestExpense] =
    React.useState(true);
  const [loadingTopClients, setLoadingTopClients] = React.useState(true);

  const handleOpenReport = () => setOpenReport(true);
  const handleCloseReport = () => setOpenReport(false);
  const handleDownloadReport = async () => {
    swalLoading();
    try {
      if (typeReport === "income") {
        await apiExportIncome(typeExport);
      } else {
        await apiExportOutcomesByMonth(typeExport);
      }
      swalSuccess("Report successfully downloaded!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleGetTotalIncome = async () => {
    setLoadingTotalIncome(true);
    try {
      const response = await apiGetIncomeSummary(filterTotalIncome);
      setTotalIncomeData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTotalIncome(false);
    }
  };
  const handleGetTotalTransaction = async () => {
    setLoadingTotalTransaction(true);
    try {
      const response = await apiGetIncomeCountSummary(filterTotalTransaction);
      setTotalTransactionData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTotalTransaction(false);
    }
  };
  const handleGetTotalCost = async () => {
    setLoadingTotalCost(true);
    try {
      const response = await apiGetOutcomeSummary(filterTotalCost);
      setTotalCostData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTotalCost(false);
    }
  };
  const handleGetTotalExpense = async () => {
    setLoadingTotalExpense(true);
    try {
      const response = await apiGetOutcomeCountSummary(filterTotalExpense);
      setTotalExpenseData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTotalExpense(false);
    }
  };
  const handleGetDailyTransaction = async () => {
    setLoadingDailyTransaction(true);
    try {
      const response = await apiGetDailySummaryChart(
        filterTypeDailyTransaction,
        {
          typeDate: filterTimeDailyTransaction,
        }
      );
      setDailyTransactionData(response.result.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDailyTransaction(false);
    }
  };
  const handleGetHighestEarning = async () => {
    setLoadingHighestEarning(true);
    try {
      const response = await apiGetTopItemsIncomeSummary(filterHighestEarning);
      setHighestEarningData(response.result.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingHighestEarning(false);
    }
  };
  const handleGetHighestExpense = async () => {
    setLoadingHighestExpense(true);
    try {
      const response = await apiGetTopItemsOutcomeSummary(filterHighestExpense);
      setHighestExpenseData(response.result.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingHighestExpense(false);
    }
  };
  const handleGetTopClients = async () => {
    setLoadingTopClients(true);
    try {
      const response = await apiGetLatestClientIncome();
      setTopClients(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTopClients(false);
    }
  };

  const valueContext = {
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
  };

  return (
    <DashboardContext.Provider value={valueContext}>
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;
