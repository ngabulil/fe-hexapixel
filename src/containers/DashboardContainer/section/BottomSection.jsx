import { WhatsappSvg } from "@/assets/svg";
import React from "react";
import { MdHistory } from "react-icons/md";
import {
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
import MainSelect from "@/components/main/MainSelect";
import { useDashboardContext } from "@/contexts/DashboardContext";
import MainTable from "@/components/main/MainTable";
import MainLoading from "@/components/main/MainLoading";

const BottomSection = () => {
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
    topClients: dataTable,
    setTopClients,
    loadingTopClients,
    setLoadingTopClients,
  } = useDashboardContext();
  const chartDataBar = dailyTransactionData?.map((item) => ({
    ...item,
    desktop: item.total,
  }));
  const chartDataRadar = highestEarningData?.map((item) => ({
    month: item.itemName,
    desktop: item.total,
  }));
  const chartDataRadar2 = highestExpenseData?.map((item) => ({
    month: item.itemName,
    desktop: item.total,
  }));
  const chartConfigBar = {
    views: {
      label: "Total",
    },
    desktop: {
      label: "Desktop",
      color: "var(--chart-2)",
    },
  };
  const chartConfigRadar = {
    desktop: {
      label: "Total",
      color: "#1CC079",
    },
  };
  const chartConfigRadar2 = {
    desktop: {
      label: "Total",
      color: "#F56927",
    },
  };
  const optionsType = ["income", "outcome"];
  const optionsRange = [7, 14, 30];
  const optionDays = ["today", "7days", "30days"];

  React.useEffect(() => {
    handleGetDailyTransaction();
  }, [filterTimeDailyTransaction, filterTypeDailyTransaction]);
  React.useEffect(() => {
    handleGetHighestEarning();
  }, [filterHighestEarning]);
  React.useEffect(() => {
    handleGetHighestExpense();
  }, [filterHighestExpense]);
  React.useEffect(() => {
    handleGetTopClients();
  }, []);

  const columns = [
    {
      id: "customerName",
      header: "Newest Client",
      accessor: "customerName",
      cell: ({ value }) => (
        <span className="w-full truncate block">{value}</span>
      ),
      thClassName: "!w-[40%]",
    },
    {
      id: "qty",
      header: "Qty",
      accessor: "qty",
      align: "center",
      cell: ({ value }) => <span>{value}</span>,
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
    },
  ];

  return (
    <div className="grid grid-cols-4 size-full gap-3 overflow-hidden">
      <div className="size-full grid grid-rows-2 gap-4 col-span-3 overflow-hidden">
        <div className="w-full h-full overflow-hidden bg-white rounded-lg p-2 flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col leading-none gap-1">
              <div className="text-[14px] font-medium">Transaction Volume</div>
              <div className="text-[12px] text-primary-white-300">
                Overview of Daily Total Transaction
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MainSelect
                options={optionsType}
                onChange={setFilterTypeDailyTransaction}
                value={filterTypeDailyTransaction}
              />
              <MainSelect
                options={optionsRange}
                onChange={setFilterTimeDailyTransaction}
                value={filterTimeDailyTransaction}
                suffix=" Days"
              />
            </div>
          </div>
          {loadingDailyTransaction ? (
            <MainLoading />
          ) : (
            <div className="size-full flex overflow-hidden">
              <ChartContainer
                config={chartConfigBar}
                className="aspect-auto size-full"
              >
                <BarChart
                  accessibilityLayer
                  data={chartDataBar}
                  margin={{
                    left: 4,
                    right: 4,
                    top: 4,
                    bottom: 4,
                  }}
                >
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    height={18}
                    tickMargin={4}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload; // ini object { date, total, totalTransaction }

                        return (
                          <div className="bg-white border p-2 rounded shadow-md text-xs">
                            <div className="pb-1">
                              <strong>
                                {new Date(data.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </strong>
                            </div>
                            <div>Total: Rp {data.total.toLocaleString()}</div>
                            <div>Transactions: {data.totalTransaction}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey={"desktop"} fill={`#1CC079`} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>
        <div className="w-full h-full overflow-hidden grid grid-cols-2 gap-3">
          <div className="size-full overflow-hidden flex p-2 bg-white rounded-lg">
            <div className="size-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-between">
                <div className="text-[14px] font-medium">
                  Highest Earning Entry
                </div>
                <div className="w-fit">
                  <MainSelect
                    options={optionDays}
                    value={filterHighestEarning}
                    onChange={setFilterHighestEarning}
                  />
                </div>
              </div>
              <div className="w-full border-b"></div>
              {loadingHighestEarning ? (
                <MainLoading />
              ) : (
                <div className="size-full flex overflow-hidden gap-2">
                  <div className="w-[70%] h-full flex shrink-0 overflow-hidden">
                    <ChartContainer
                      config={chartConfigRadar}
                      className="mx-auto size-full"
                    >
                      <RadarChart data={chartDataRadar}>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          fillOpacity={0.3}
                          dot={{
                            r: 4,
                            fillOpacity: 1,
                          }}
                        />
                      </RadarChart>
                    </ChartContainer>
                  </div>
                  <div className="flex-1 flex items-center overflow-hidden">
                    <div className="w-full h-fit flex flex-col gap-2 leading-none text-[10px] text-primary-white-300 overflow-hidden">
                      {chartDataRadar?.map((item, index) => (
                        <div key={index} className="truncate">{`${index + 1}. ${
                          item.month
                        }`}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="size-full overflow-hidden flex p-2 bg-white rounded-lg">
            <div className="size-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-between">
                <div className="text-[14px] font-medium">
                  Highest Expense Entry
                </div>
                <div className="w-fit">
                  <MainSelect
                    options={optionDays}
                    value={filterHighestExpense}
                    onChange={setFilterHighestExpense}
                  />
                </div>
              </div>
              <div className="w-full border-b"></div>
              {loadingHighestExpense ? (
                <MainLoading />
              ) : (
                <div className="size-full flex overflow-hidden gap-2">
                  <div className="w-[70%] h-full flex shrink-0 overflow-hidden">
                    <ChartContainer
                      config={chartConfigRadar2}
                      className="mx-auto size-full"
                    >
                      <RadarChart data={chartDataRadar2}>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          fillOpacity={0.3}
                          dot={{
                            r: 4,
                            fillOpacity: 1,
                          }}
                        />
                      </RadarChart>
                    </ChartContainer>
                  </div>
                  <div className="flex-1 flex items-center overflow-hidden">
                    <div className="w-full h-fit flex flex-col gap-2 leading-none text-[10px] text-primary-white-300 overflow-hidden">
                      {chartDataRadar2?.map((item, index) => (
                        <div key={index} className="truncate">{`${index + 1}. ${
                          item.month
                        }`}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="size-full overflow-hidden flex p-2 bg-white rounded-lg">
        <div className="size-full flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <div className="w-fit flex flex-col gap-2 leading-none">
              <div className="font-medium text-[14px]">Client Contact</div>
              <div className="text-[12px] text-primary-white-300">
                Overview of daily
              </div>
            </div>
            <div className="pr-2">
              <MdHistory className="shrink-0 size-[20px]" />
            </div>
          </div>
          <div className="w-full border-b"></div>
          <div className="size-full overflow-hidden">
            <MainTable
              columns={columns}
              data={dataTable}
              getRowKey={(row) => row.id}
              className={"table-fixed"}
              isLoading={loadingTopClients}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
