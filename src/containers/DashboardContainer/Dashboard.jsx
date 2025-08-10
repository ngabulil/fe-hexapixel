import { ReportSvg } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import React from "react";
import ImgPlaceholder from "@/assets/image/placeholder.png";
import { FaChevronDown } from "react-icons/fa6";

const Dashboard = () => {
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
    </div>
  );
};

export default Dashboard;
