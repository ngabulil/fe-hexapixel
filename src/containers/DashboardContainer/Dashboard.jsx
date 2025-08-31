import { ChartUpSvg, MoneyUp, ReportSvg } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import React from "react";
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
import HeaderSection from "./section/HeaderSection";
import TopSection from "./section/TopSection";
import BottomSection from "./section/BottomSection";

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
  return (
    <div className="size-full flex flex-col gap-3">
      <HeaderSection />
      <div className="border-b border-black/20 w-full"></div>
      <div className="pt-2 flex size-full flex-col gap-4 overflow-hidden">
        <TopSection />
        <BottomSection />
      </div>
    </div>
  );
};

export default Dashboard;
