// TablePagination.jsx
import React from "react";
import clsx from "clsx";
import MainTable from "./MainTable";
import MainSelect from "./MainSelect";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TablePagination = ({
  data = [],
  columns = [],
  className,
  tableProps,
  isLoading = false,
  getRowKey = (_row, i) => i,

  // Opsi local (uncontrolled)
  rowsPerPageOptions = [10, 25, 50, 100],
  initialPage = 1,
  initialPageSize = 10,

  // Server-side control
  fetchData, // function({ page, limit })
  pagination = {}, // { page, limit, totalPage }
  setPagination, // function({ page, limit })
}) => {
  // Ambil nilai dari server-side pagination jika ada
  const {
    page: controlledPage,
    limit: controlledPageSize,
    totalPage: serverTotalPages,
  } = pagination || {};

  // Uncontrolled fallback (local pagination)
  const [uPage, setUPage] = React.useState(initialPage);
  const [uPageSize, setUPageSize] = React.useState(initialPageSize);

  // Pakai controlled bila tersedia, fallback ke uncontrolled
  const page = controlledPage ?? uPage;
  const pageSize = controlledPageSize ?? uPageSize;

  // Deteksi server-side mode: ada totalPage > 0
  const isServerPaginated =
    Number.isFinite(serverTotalPages) && serverTotalPages > 0;

  // Hitung total pages untuk tampilan pagination
  const localTotalItems = data.length;
  const localTotalPages = Math.max(
    1,
    Math.ceil(localTotalItems / Math.max(1, pageSize))
  );
  const safeTotalPages = isServerPaginated ? serverTotalPages : localTotalPages;

  // Data untuk tabel:
  // - server-side: gunakan data apa adanya (JANGAN slice lagi)
  // - local: slice berdasarkan page & pageSize
  const paginatedData = isServerPaginated
    ? data
    : localTotalItems > 0
    ? data.slice(
        (page - 1) * pageSize,
        Math.min((page - 1) * pageSize + pageSize, localTotalItems)
      )
    : [];

  // Helper untuk update page (sync ke parent + fetch)
  function handlePageChange(nextPage) {
    const p = Math.min(Math.max(1, Number(nextPage) || 1), safeTotalPages);

    // Server-side: pakai setPagination + fetchData
    if (isServerPaginated) {
      if (typeof setPagination === "function") {
        setPagination({ page: p, limit: pageSize });
      }
      if (typeof fetchData === "function") {
        fetchData({ page: p, limit: pageSize });
      }
      return;
    }
    // Local mode
    setUPage(p);
  }

  // Helper untuk update pageSize (sync ke parent + fetch)
  function handlePageSizeChange(val) {
    const nextSize = parseInt(val, 10);
    if (Number.isNaN(nextSize) || nextSize <= 0) return;

    // Server-side: reset ke page 1 + fetch
    if (isServerPaginated) {
      if (typeof setPagination === "function") {
        setPagination({ page: 1, limit: nextSize });
      }
      if (typeof fetchData === "function") {
        fetchData({ page: 1, limit: nextSize });
      }
      return;
    }

    // Local mode
    setUPage(1);
    setUPageSize(nextSize);
  }

  // Buat daftar nomor halaman dengan ellipsis (1 … c-1 c c+1 … t)
  function getPageNumbers(c, t) {
    const current = Math.min(Math.max(1, c || 1), Math.max(1, t || 1));
    const total = Math.max(1, t || 1);

    const pages = new Set([1, total, current, current - 1, current + 1]);
    pages.add(2);
    pages.add(total - 1);

    const arr = [...pages]
      .filter((n) => n >= 1 && n <= total)
      .sort((a, b) => a - b);

    const withDots = [];
    for (let i = 0; i < arr.length; i++) {
      const n = arr[i];
      if (i === 0) {
        withDots.push(n);
      } else {
        const prev = arr[i - 1];
        if (n - prev === 1) {
          withDots.push(n);
        } else {
          withDots.push("ellipsis", n);
        }
      }
    }
    return withDots;
  }

  const pageItems = getPageNumbers(page, safeTotalPages);

  // Clamp page kalau page > total pages (mis. setelah filter berubah)
  React.useEffect(() => {
    if (page > safeTotalPages) {
      handlePageChange(safeTotalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeTotalPages]);

  // Tampilkan pagination hanya saat memang lebih dari 1 halaman
  const hasAnyData = isServerPaginated ? data.length > 0 : localTotalItems > 0;
  const shouldShowPagination = hasAnyData;

  return (
    <div
      className={clsx(
        "size-full flex flex-col gap-3 overflow-hidden",
        className
      )}
    >
      {/* Table */}
      <MainTable
        data={paginatedData}
        columns={columns}
        isLoading={isLoading}
        getRowKey={getRowKey}
        {...tableProps}
      />

      {/* Pagination */}
      {shouldShowPagination && (
        <div className="flex relative">
          {/* Rows per page */}
          <div className="w-[25%] shrink-0 flex items-center justify-center">
            <MainSelect
              label="Show"
              value={String(pageSize)}
              onChange={handlePageSizeChange}
              options={rowsPerPageOptions.map(String)} // MainSelect expects string values
              suffix=" rows"
              containerProps={{
                className: "!flex-row !items-center gap-4 !w-fit",
              }}
              trigerProps={{ className: "w-fit h-[30px]" }}
            />
          </div>

          {/* Page navigator */}
          <Pagination className={"absolute left-1/2 -translate-x-1/2 "}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page === 1}
                  className={clsx(
                    page === 1 && "pointer-events-none opacity-50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) handlePageChange(page - 1);
                  }}
                />
              </PaginationItem>

              {pageItems.map((it, idx) =>
                it === "ellipsis" ? (
                  <PaginationItem key={`dots-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={it}>
                    <PaginationLink
                      href="#"
                      isActive={it === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(it);
                      }}
                    >
                      {it}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page === safeTotalPages}
                  className={clsx(
                    page === safeTotalPages && "pointer-events-none opacity-50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < safeTotalPages) handlePageChange(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default TablePagination;
