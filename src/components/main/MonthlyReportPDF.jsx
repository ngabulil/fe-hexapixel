// 'use client'
import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { usePDF } from "react-to-pdf";
import Swal from "sweetalert2";
import "@/styles/report-pdf.css";

const toIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(n || 0));
const getName = (r) => r?.customerName || r?.personInTransaction || "-";
const getItem = (r) => r?.item?.name || "-";
const getCreator = (r) => r?.createdBy?.fullName || "-";
const getDate = (r) =>
  r?.createdAt ? dayjs(r.createdAt).format("DD MMM YYYY HH:mm") : "-";
const getAmount = (r) => r?.amount ?? r?.totalPrice ?? r?.price ?? 0;

// paginate: first page N1 rows, then N2 rows each
const paginateRows = (rows, firstCount, otherCount) => {
  if (!rows?.length) return [];
  const pages = [];
  pages.push(rows.slice(0, firstCount));
  let i = firstCount;
  while (i < rows.length) {
    pages.push(rows.slice(i, i + otherCount));
    i += otherCount;
  }
  return pages;
};
const startIndexForPage = (pageIdx, firstCount, otherCount) =>
  pageIdx === 0 ? 0 : firstCount + (pageIdx - 1) * otherCount;

export default function MonthlyReportPDF({
  data,
  title = "Monthly Finance Report",
}) {
  const rows = data?.datas || [];
  const start = useMemo(() => dayjs(data?.startDate), [data?.startDate]);
  const end = useMemo(() => dayjs(data?.endDate), [data?.endDate]);
  const typeLabel = data?.type === "outcomes" ? "Outcome" : "Income";
  const fileName = `${typeLabel}-${start.format("YYYYMMDD")}_${end.format(
    "YYYYMMDD"
  )}.pdf`;
  const totalAmount = useMemo(
    () => rows.reduce((a, r) => a + (+getAmount(r) || 0), 0),
    [rows]
  );

  const ROWS_FIRST_PAGE = 32;
  const ROWS_OTHER_PAGES = 35;
  const pages = paginateRows(rows, ROWS_FIRST_PAGE, ROWS_OTHER_PAGES);

  const { toPDF, targetRef } = usePDF({ filename: fileName });

  useEffect(() => {
    if (rows.length === 0) {
      Swal.fire("Error", "No data found", "error");
      return;
    }
    toPDF();
  }, []);

  if (rows.length === 0) return null;

  return (
    <div className="w-full">
      {/* <div className="mb-3 print:hidden">
        <button onClick={() => toPDF()} className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition">
          Download PDF
        </button>
      </div> */}

      <div
        ref={targetRef}
        className="mx-auto w-full max-w-[900px] bg-white text-gray-900 p-6 rounded-2xl shadow-sm absolute right-[-9999px]"
      >
        {/* Header ringkas */}
        <div className="flex items-start justify-between gap-4 border-b pb-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold">
              {title} — {typeLabel}
            </h1>
            <p className="text-xs text-gray-600">
              Period:{" "}
              <span className="font-medium">{start.format("DD MMM YYYY")}</span>{" "}
              — <span className="font-medium">{end.format("DD MMM YYYY")}</span>
            </p>
            <p className="text-[11px] text-gray-500">
              Generated: {dayjs().format("DD MMM YYYY HH:mm")}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs">Total Records</div>
            <div className="text-xl font-bold leading-none">{rows.length}</div>
            <div className="mt-2 text-xs">Total Amount</div>
            <div className="text-lg font-bold">{toIDR(totalAmount)}</div>
          </div>
        </div>

        {/* Tabel per-halaman: page 1 = 31 row, sisanya = 40 row */}
        {pages.map((group, pageIdx) => {
          const baseIdx = startIndexForPage(
            pageIdx,
            ROWS_FIRST_PAGE,
            ROWS_OTHER_PAGES
          );
          return (
            <div
              key={pageIdx}
              className={`page-section ${pageIdx > 0 ? "pt-6 mt-10" : ""} pb-6`}
            >
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full table-fixed text-[11px]">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="p-2 w-10">#</th>
                      <th className="p-2 w-32">
                        {data?.type === "outcomes" ? "Person" : "Customer Name"}
                      </th>
                      <th className="p-2 w-32">Whatsapp</th>
                      <th className="p-2 w-44">Item</th>
                      <th className="p-2 w-28">Amount</th>
                      <th className="p-2 w-32">Created By</th>
                      <th className="p-2 w-[138px]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((row, i) => {
                      const idx = baseIdx + i;
                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="p-2 align-top">{idx + 1}</td>
                          <td className="p-2 align-top break-words">
                            {getName(row)}
                          </td>
                          <td className="p-2 align-top break-words">
                            {row?.whatsapp || "-"}
                          </td>
                          <td className="p-2 align-top break-words">
                            {getItem(row)}
                          </td>
                          <td className="p-2 align-top">
                            {toIDR(getAmount(row))}
                          </td>
                          <td className="p-2 align-top break-words">
                            {getCreator(row)}
                          </td>
                          <td className="p-2 align-top">{getDate(row)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Total */}
        {rows.length > 0 && (
          <div className="mt-4">
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-[11px]">
                <tbody>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="p-2 w-[70%]">Total</td>
                    <td className="p-2 text-right">{toIDR(totalAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-3 text-[10px] text-gray-500">
          * This document is generated automatically for the selected period.
        </div>
      </div>
    </div>
  );
}
