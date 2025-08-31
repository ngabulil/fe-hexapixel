import MainSelect from "@/components/main/MainSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import React from "react";

const ModalReport = () => {
  const {
    openReport,
    setOpenReport,
    typeExport,
    setTypeExport,
    handleDownloadReportOutcome,
  } = useOutcomeContext();
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
            <Button className="w-full" onClick={handleDownloadReportOutcome}>
              Download
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalReport;
