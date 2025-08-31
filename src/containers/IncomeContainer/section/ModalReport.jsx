import MainSelect from "@/components/main/MainSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIncomeContext } from "@/contexts/IncomeContext";
import React from "react";

const ModalReport = () => {
  const {
    openReport,
    setOpenReport,
    typeExport,
    setTypeExport,
    handleDownloadReportIncome,
  } = useIncomeContext();
  const optionsTypeExport = ["currMonth", "prevMonth"];

  return (
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
          <div>
            <Button className="w-full" onClick={handleDownloadReportIncome}>
              Download
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalReport;
