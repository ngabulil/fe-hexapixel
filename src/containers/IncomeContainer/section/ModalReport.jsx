import MainSelect from "@/components/main/MainSelect";
import MonthlyReportPDF from "@/components/main/MonthlyReportPDF";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIncomeContext } from "@/contexts/IncomeContext";
import React, { useEffect } from "react";

const ModalReport = () => {
  const {
    openReport,
    setOpenReport,
    typeExport,
    setTypeExport,
    handleDownloadReportIncome,
    dataReport,
    setDataReport,
    loadingReport,
    setLoadingReport,
    handleGetPdfReport,
  } = useIncomeContext();
  const optionsTypeExport = ["currMonth", "prevMonth"];

  useEffect(() => {
    if (dataReport && !loadingReport) {
      setDataReport(null);
    }
  }, [dataReport]);

  return (
    <>
      <Dialog open={openReport} onOpenChange={setOpenReport}>
        <DialogContent>
          <DialogHeader className={"gap-2"}>
            <DialogTitle>Download Report</DialogTitle>
            <div className="flex gap-3 [&_button]:py-2">
              <MainSelect
                label="Type Export"
                options={optionsTypeExport}
                onChange={setTypeExport}
                value={typeExport}
              />
            </div>
            <div className="flex gap-3">
              <Button className="w-full" onClick={handleDownloadReportIncome}>
                Download Excel
              </Button>
              <Button className="w-full" onClick={handleGetPdfReport}>
                Download PDF
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {!loadingReport && dataReport && (
        <MonthlyReportPDF data={dataReport} title="Monthly Report" />
      )}
    </>
  );
};

export default ModalReport;
