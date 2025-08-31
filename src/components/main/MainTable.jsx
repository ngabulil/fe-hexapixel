import React from "react";
import clsx from "clsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import MainLoading from "./MainLoading";
import { TbNotesOff } from "react-icons/tb";

function MainTable({
  data = [],
  columns = [],
  caption,
  className,
  getRowKey = (_row, i) => i,
  isLoading = false,
}) {
  const getValue = (row, col) => {
    if (col.accessor == null) return undefined;
    return typeof col.accessor === "function"
      ? col.accessor(row)
      : row[col.accessor];
  };

  const alignClass = (align) =>
    align === "right"
      ? "text-right"
      : align === "center"
      ? "text-center"
      : undefined;

  if (isLoading) {
    return <MainLoading />;
  }

  if (!isLoading && data.length === 0) {
    return (
      <div className="size-full flex flex-col gap-2 justify-center items-center">
        <TbNotesOff className="text-primary-black-200 size-[34px]" />
        <div className="text-[14px] text-primary-black-200">
          No data found
        </div>
      </div>
    );
  }

  return (
    <Table className={clsx(className)}>
      {caption ? <TableCaption>{caption}</TableCaption> : null}

      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.id}
              className={clsx(
                "text-[14px] text-primary-black-300",
                alignClass(col.align),
                col.thClassName
              )}
            >
              {typeof col.header === "function"
                ? col.header({ column: col })
                : col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={getRowKey(row, rowIndex)}>
            {columns.map((col) => {
              const value = getValue(row, col);
              return (
                <TableCell
                  key={col.id}
                  className={clsx(
                    "text-[12px] text-primary-black-200",
                    alignClass(col.align),
                    col.tdClassName
                  )}
                >
                  {col.cell
                    ? col.cell({ row, value, column: col, rowIndex })
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MainTable;
