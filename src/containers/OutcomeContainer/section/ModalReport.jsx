import MainSelect from "@/components/main/MainSelect";
import MonthlyReportPDF from "@/components/main/MonthlyReportPDF";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import React, { useEffect } from "react";

const ModalReport = () => {
  const {
    openReport,
    setOpenReport,
    typeExport,
    setTypeExport,
    handleDownloadReportOutcome,
    dataReport,
    setDataReport,
    loadingReport,
    setLoadingReport,
    handleGetPdfReport,
  } = useOutcomeContext();
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
              <Button className="w-full" onClick={handleDownloadReportOutcome}>
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
