import { InfoVectorSvg } from "@/assets/svg";
import MiniProfile from "@/components/main/MiniProfile";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Info = () => {
  return (
    <div className="size-full flex flex-col gap-3">
      <div className="h-[42px] w-full shrink-0 flex justify-end">
        <MiniProfile />
      </div>
      <div className="border-b border-black/20 w-full"></div>
      <div className="size-full pt-2 flex overflow-hidden">
        {/* <TableUsers /> */}
        <div className="size-full flex flex-col justify-center items-center gap-4 rounded-md bg-white text-center">
          <InfoVectorSvg />
          <div className="text-2xl font-semibold">Need Help ?</div>
          <div className="w-[40%]">
            If you experience any issues while using the platform, please
            contact the provided support for further assistance.
          </div>
          <Button>
            <FaWhatsapp />
            <div>Contact Support</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
