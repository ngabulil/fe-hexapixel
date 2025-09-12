import React from "react";
import { ChartDownSvg, ChartUpSvg, MoneyUp, ReportSvg } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import ImgPlaceholder from "@/assets/image/placeholder.png";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRibuan } from "@/utils/formatNumber";
import {
  Area,
  AreaChart,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { useDashboardContext } from "@/contexts/DashboardContext";
import MainSelect from "@/components/main/MainSelect";
import { FaSpinner } from "react-icons/fa";
import MainLoading from "@/components/main/MainLoading";

const fmtRange = (fromISO, toISO, type) => {
  if (type === "today") {
    return `${dayjs(fromISO).format("DD MMM YYYY HH:mm")} – ${dayjs(
      toISO
    ).format("HH:mm")}`;
  }
  return `${dayjs(fromISO).format("DD MMM YYYY")} – ${dayjs(toISO).format(
    "DD MMM YYYY"
  )}`;
};

// custom tooltip (hanya muncul di titik prev & curr)
// Tooltip portal: render ke <body> agar tidak kena overflow parent
const OnlyEdgeTooltip = ({ active, payload, coordinate, getContainerRect }) => {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0].payload;
  if (row.key !== "previous" && row.key !== "current") return null;

  const rect = getContainerRect?.();
  if (!rect || !coordinate) return null;

  // posisi absolut di page
  const offset = 12; // jarak dari titik
  const left = rect.left + window.scrollX + coordinate.x + offset;
  const top = rect.top + window.scrollY + coordinate.y - 40; // naik dikit biar nggak nutup titik

  const node = (
    <div
      style={{
        position: "absolute",
        left,
        top,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      className="rounded-md border bg-white p-2 shadow-sm text-sm"
    >
      <div className="font-medium">
        {row.key === "current" ? "Current period" : "Previous period"}
      </div>
      <div>
        Count: <b>{row.desktop}</b>
      </div>
      <div className="text-xs opacity-70">{row.range}</div>
    </div>
  );

  // render ke body, lalu return null di dalam wrapper Tooltip Recharts
  return createPortal(node, document.body);
};

const formatDay = (day) => {
  if (day === "today") return "Today";
  if (day === "3days") return "In 3 days";
  if (day === "7days") return "In 7 days";
  if (day === "30days") return "In 30 days";
};

const TopSection = () => {
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
  } = useDashboardContext();
  const chartWrapperIncomeRef = React.useRef(null);
  const chartWrapperExpenseRef = React.useRef(null);
  const chartData = totalTransactionData?.detail?.map((item) => ({
    desktop: item.total,
  }));
  const chartDataExpense = totalExpenseData?.detail?.map((item) => ({
    desktop: item.total,
  }));
  const chartConfig = {
    desktop: { label: "Income", color: "#1CC079" },
  };
  const chartConfigExpense = {
    desktop: { label: "Expense", color: "#F56927" },
  };
  const options = ["today", "7days", "30days"];
  const optionsCount = ["3days", "7days", "30days"];
  function calculatePercentage(current, previous) {
    if (!previous || previous === 0) {
      return {
        status: current > 0 ? "plus" : "neutral",
        value: current,
      };
    }

    const diff = current - previous;
    const percent = Math.floor((diff / previous) * 100);

    return {
      status: percent >= 0 ? "plus" : "minus",
      value: Math.abs(percent),
    };
  }

  const percentTotalIncome = calculatePercentage(
    totalIncomeData?.current?.total,
    totalIncomeData?.previous?.total
  );

  const percentTotalTransaction = calculatePercentage(
    totalTransactionData?.current?.total,
    totalTransactionData?.previous?.total
  );

  const percentTotalCost = calculatePercentage(
    totalCostData?.current?.total,
    totalCostData?.previous?.total
  );

  const percentTotalExpense = calculatePercentage(
    totalExpenseData?.current?.total,
    totalExpenseData?.previous?.total
  );

  React.useEffect(() => {
    handleGetTotalIncome();
  }, [filterTotalIncome]);
  React.useEffect(() => {
    handleGetTotalTransaction();
  }, [filterTotalTransaction]);
  React.useEffect(() => {
    handleGetTotalCost();
  }, [filterTotalCost]);
  React.useEffect(() => {
    handleGetTotalExpense();
  }, [filterTotalExpense]);

  return (
    <div className="w-full h-[25%] shrink-0 grid grid-cols-4 gap-3">
      <div className="size-full overflow-hidden bg-white rounded-lg p-2 flex flex-col gap-6 relative">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <MoneyUp className="size-[20px]" />
            <div className="text-[14px] font-medium leading-none pt-1">
              Total Income
            </div>
          </div>
          <div className="w-fit -mb-1">
            <MainSelect
              options={options}
              value={filterTotalIncome}
              onChange={setFilterTotalIncome}
            />
          </div>
        </div>
        {loadingTotalIncome ? (
          <MainLoading />
        ) : (
          <>
            <div className="w-full h-fit flex gap-1">
              <div className="text-[12px]">Rp</div>
              <div className="text-[44px] leading-none break-all">
                {formatRibuan(totalIncomeData?.current?.total || 0)}
              </div>
            </div>
            <div className="absolute bottom-2 left-2 flex gap-2 items-center">
              {percentTotalIncome.status === "plus" ? (
                <ChartUpSvg className="size-[20px]" />
              ) : (
                <ChartDownSvg className="size-[20px]" />
              )}
              <div className="text-[10px]">
                {percentTotalIncome.status === "plus" ? "+" : "-"}
                {percentTotalIncome.value}% from previous period
              </div>
            </div>
          </>
        )}
      </div>
      <div className="size-full overflow-hidden bg-white rounded-lg p-2 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <ChartUpSvg className="size-[20px] [&>path]:stroke-black" />
            <div className="text-[14px] font-medium leading-none pt-1">
              Total Transaction
            </div>
          </div>
          <div className="w-fit -mb-1">
            <MainSelect
              options={optionsCount}
              value={filterTotalTransaction}
              onChange={setFilterTotalTransaction}
            />
          </div>
        </div>
        {loadingTotalTransaction ? (
          <MainLoading />
        ) : (
          <div className="size-full grid grid-cols-2 gap-2 overflow-hidden">
            <div className="size-full flex flex-col justify-between gap-2">
              <div className="flex gap-1 size-full">
                <div className="text-[44px] leading-none py-2">
                  {totalTransactionData?.current?.total}
                </div>
                <div className="text-[10px] leading-none py-6">
                  {formatDay(filterTotalTransaction)}
                </div>
              </div>
              <div className="flex w-full gap-2 items-center overflow-hidden">
                {percentTotalTransaction.status === "plus" ? (
                  <ChartUpSvg className="size-[20px]" />
                ) : (
                  <ChartDownSvg className="size-[20px]" />
                )}
                <div className="text-[10px] truncate">
                  {percentTotalTransaction.status === "plus" ? "+" : "-"}
                  {percentTotalTransaction.value}% from previous period
                </div>
              </div>
            </div>
            <div
              ref={chartWrapperIncomeRef}
              className="size-full flex overflow-hidden"
            >
              <ChartContainer config={chartConfig} className="size-full">
                <AreaChart
                  accessibilityLayer
                  height={100}
                  margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
                  data={chartData}
                >
                  {/* <Tooltip
                  wrapperStyle={{ visibility: "hidden" }}
                  cursor={false}
                  content={
                    <OnlyEdgeTooltip
                      getContainerRect={() =>
                        chartWrapperIncomeRef.current?.getBoundingClientRect()
                      }
                    />
                  }
                /> */}
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.3}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        )}
      </div>
      {/* expense */}
      <div className="size-full overflow-hidden bg-white rounded-lg p-2 flex flex-col gap-6 relative">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <MoneyUp className="size-[20px]" />
            <div className="text-[14px] font-medium leading-none pt-1">
              Total Cost
            </div>
          </div>
          <div className="w-fit -mb-1">
            <MainSelect
              options={options}
              value={filterTotalCost}
              onChange={setFilterTotalCost}
            />
          </div>
        </div>
        {loadingTotalCost ? (
          <MainLoading />
        ) : (
          <>
            <div className="w-full h-fit flex gap-1">
              <div className="text-[12px]">Rp</div>
              <div className="text-[44px] leading-none break-all">
                {formatRibuan(totalCostData?.current?.total || 0)}
              </div>
            </div>
            <div className="absolute bottom-2 left-2 flex gap-2 items-center">
              {percentTotalCost.status === "plus" ? (
                <ChartUpSvg className="size-[20px]" />
              ) : (
                <ChartDownSvg className="size-[20px]" />
              )}
              <div className="text-[10px]">
                {percentTotalCost.status === "plus" ? "+" : "-"}
                {percentTotalCost.value}% from previous period
              </div>
            </div>
          </>
        )}
      </div>
      <div className="size-full overflow-hidden bg-white rounded-lg p-2 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <ChartUpSvg className="size-[20px] [&>path]:stroke-black" />
            <div className="text-[14px] font-medium leading-none pt-1">
              Total Expense
            </div>
          </div>
          <div className="w-fit -mb-1">
            <MainSelect
              options={optionsCount}
              value={filterTotalExpense}
              onChange={setFilterTotalExpense}
            />
          </div>
        </div>
        {loadingTotalExpense ? (
          <MainLoading />
        ) : (
          <div className="size-full grid grid-cols-2 gap-2 overflow-hidden">
            <div className="size-full flex flex-col justify-between gap-2">
              <div className="flex gap-1 size-full">
                <div className="text-[44px] leading-none py-2">
                  {totalExpenseData?.current?.total}
                </div>
                <div className="text-[10px] leading-none py-6">
                  {formatDay(filterTotalExpense)}
                </div>
              </div>
              <div className="flex w-full gap-2 items-center overflow-hidden">
                {percentTotalExpense.status === "plus" ? (
                  <ChartUpSvg className="size-[20px]" />
                ) : (
                  <ChartDownSvg className="size-[20px]" />
                )}
                <div className="text-[10px] truncate">
                  {percentTotalExpense.status === "plus" ? "+" : "-"}
                  {percentTotalExpense.value}% from previous period
                </div>
              </div>
            </div>
            <div
              ref={chartWrapperExpenseRef}
              className="size-full flex overflow-hidden"
            >
              <ChartContainer config={chartConfigExpense} className="size-full">
                <AreaChart
                  accessibilityLayer
                  height={100}
                  margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
                  data={chartDataExpense}
                >
                  {/* <Tooltip
                  wrapperStyle={{ visibility: "hidden" }}
                  cursor={false}
                  content={
                    <OnlyEdgeTooltip
                      getContainerRect={() =>
                        chartWrapperExpenseRef.current?.getBoundingClientRect()
                      }
                    />
                  }
                /> */}
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.3}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSection;
