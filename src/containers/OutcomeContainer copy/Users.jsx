import React from "react";
import HeaderSection from "./section/HeaderSection";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import CreateOutcome from "./section/FormOutcome";
import TableOutcome from "./section/TableUsers";
import TableUsers from "./section/TableUsers";
import ModalUser from "./section/ModalUser";

const Users = () => {
  return (
    <div className="size-full flex flex-col gap-3">
      <HeaderSection />
      <div className="border-b border-black/20 w-full"></div>
      <div className="size-full pt-2 flex overflow-hidden">
        <TableUsers />
      </div>
      <ModalUser />
    </div>
  );
};

export default Users;
