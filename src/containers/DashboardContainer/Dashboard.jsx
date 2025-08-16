import { ChartUpSvg, MoneyUp, ReportSvg } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import React from "react";
import { createPortal } from "react-dom";
import ImgPlaceholder from "@/assets/image/placeholder.png";
import { FaChevronDown } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRibuan } from "@/utils/formatNumber";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dayjs from "dayjs";

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

const Dashboard = () => {
  const chartWrapperRef = React.useRef(null);
  const dummySummary = {
    type: "today",
    current: {
      fromDate: "2025-08-17T00:00:00.000Z",
      toDate: "2025-08-17T23:59:59.999Z",
      total: 0,
    },
    previous: {
      fromDate: "2025-08-16T00:00:00.000Z",
      toDate: "2025-08-16T23:59:59.999Z",
      total: 100,
    },
  };

  // bikin data buat chart
  const chartData = [
    {
      desktop: dummySummary.previous.total,
      key: "previous",
      range: fmtRange(
        dummySummary.previous.fromDate,
        dummySummary.previous.toDate,
        dummySummary.type
      ),
    },
    {
      desktop: dummySummary.current.total,
      key: "current",
      range: fmtRange(
        dummySummary.current.fromDate,
        dummySummary.current.toDate,
        dummySummary.type
      ),
    },
  ];
  const chartConfig = {
    desktop: { label: "Income", color: "#1CC079" },
  };

  return (
    <div className="size-full flex flex-col gap-3">
      <div className="h-[42px] w-full shrink-0 flex justify-between">
        <div className="w-fit my-auto">
          <Button variant="secondary" className="rounded-md py-1">
            <div className="flex gap-2 items-center">
              <div>Create Report</div>
              <ReportSvg />
            </div>
          </Button>
        </div>
        <div className="w-fit h-full min-w-[180px] rounded-full p-1 flex items-center gap-8 justify-between bg-white cursor-pointer">
          <div className="flex items-center gap-2">
            <img
              className="size-[30px] rounded-full shrink-0"
              src={ImgPlaceholder}
              alt=""
            />
            <div className="flex flex-col leading-none gap-0.5">
              <div className="text-[11px] text-primary-black-200">
                Super Admin
              </div>
              <div className="text-[10px] text-primary-white-200">
                Super Admin
              </div>
            </div>
          </div>
          <div className="pr-2">
            <FaChevronDown className="text-primary-white-200 size-[12px]" />
          </div>
        </div>
      </div>
      <div className="border-b border-black/20 w-full"></div>
      <div className="pt-2 flex size-full flex-col gap-4 overflow-hidden">
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
                <Select value="light">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full h-fit flex gap-1">
              <div className="text-[12px]">Rp</div>
              <div className="text-[44px] leading-none break-all">
                {formatRibuan(9999999)}
              </div>
            </div>
            <div className="absolute bottom-2 left-2 flex gap-2 items-center">
              <ChartUpSvg className="size-[20px]" />
              <div className="text-[10px]">10% from previous period</div>
            </div>
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
                <Select value="light">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="size-full grid grid-cols-2 gap-2 overflow-hidden">
              <div className="size-full flex flex-col justify-between gap-2">
                <div className="flex gap-1 size-full">
                  <div className="text-[44px] leading-none py-2">999</div>
                  <div className="text-[10px] leading-none py-6">
                    In 30 Days
                  </div>
                </div>
                <div className="flex w-full gap-2 items-center overflow-hidden">
                  <ChartUpSvg className="size-[20px] shrink-0" />
                  <div className="text-[10px] truncate">
                    10% from previous period
                  </div>
                </div>
              </div>
              <div
                ref={chartWrapperRef}
                className="size-full flex overflow-hidden"
              >
                <ChartContainer config={chartConfig} className="size-full">
                  <AreaChart
                    accessibilityLayer
                    height={100}
                    margin={{ bottom: 4, left: 4, right: 4, top: 4 }}
                    data={chartData}
                  >
                    <Tooltip
                      wrapperStyle={{ visibility: "hidden" }}
                      cursor={false}
                      content={
                        <OnlyEdgeTooltip
                          getContainerRect={() =>
                            chartWrapperRef.current?.getBoundingClientRect()
                          }
                        />
                      }
                    />
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
          </div>
        </div>
        <div className="grid grid-cols-4 size-full gap-3">
          <div className="size-full grid grid-rows-2 gap-4 col-span-3 overflow-hidden">
            <div className="w-full h-full overflow-hidden"></div>
            <div className="w-full h-full overflow-hidden grid grid-cols-2 gap-3">
              <div className="size-full overflow-hidden"></div>
              <div className="size-full overflow-hidden"></div>
            </div>
          </div>
          <div className="size-full overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
