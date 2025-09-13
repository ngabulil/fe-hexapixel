import { WhatsappSvg } from "@/assets/svg";
import { InputWithLabel } from "@/components/main/InputWithLabel";
import MainSelect from "@/components/main/MainSelect";
import MainTable from "@/components/main/MainTable";
import { Button } from "@/components/ui/button";
import { useOutcomeContext } from "@/contexts/OutcomeContext";
import clsx from "clsx";
import React from "react";
import { MdHistory } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import { FiUpload } from "react-icons/fi";

const CreateOutcome = () => {
  const {
    typeExport,
    setTypeExport,
    mode,
    setMode,
    price,
    setPrice,
    search,
    setSearch,
    receipt,
    setReceipt,
    item,
    setItem,
    quantity,
    setQuantity,
    customerName,
    setCustomerName,
    whatsapp,
    setWhatsapp,
    itemOptions,
    setItemOptions,
    tableFixed,
    setTableFixed,
    tableHistory,
    setTableHistory,
    paginationHistory,
    setPaginationHistory,
    selectedRow,
    setSelectedRow,
    totalPrice,
    setTotalPrice,
    loadingInput,
    loadingTableFixed,
    loadingTableHistory,
    handleSetMode,
    handleSetModeEdit,
    handleDownloadReportOutcome,
    handleCreateOutcome,
    handleGetItemOptions,
    handleGetTableFixed,
    handleGetTableHistory,
    handleDeleteOutcome,
    handleEditOutcome,
    handleCreateItem,
  } = useOutcomeContext();

  React.useEffect(() => {
    handleGetItemOptions();
    handleGetTableFixed();
  }, []);
  React.useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  const columns = [
    {
      id: "personInTransaction",
      header: "Person Name",
      accessor: "personInTransaction",
      cell: ({ value }) => (
        <span className="w-full truncate block">{value}</span>
      ),
      thClassName: "!w-[40%]",
    },
    {
      id: "qty",
      header: "Qty",
      accessor: "quantity",
      align: "center",
      cell: ({ value }) => <span>{value}</span>,
    },
    {
      id: "whatsapp",
      header: "Contact",
      accessor: "whatsapp",
      cell: ({ value }) => (
        <a
          href={`https://wa.me/62${value.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <WhatsappSvg />
        </a>
      ),
    },
  ];

  return (
    <div className="size-full flex gap-6">
      <div className="h-full w-[70%] shrink-0 flex flex-col gap-6 bg-white p-4 rounded-md overflow-hidden">
        <div className="flex flex-col gap-4 size-full overflow-hidden">
          <div className="text-[24px] font-medium">Outcome Input</div>
          <div className="border-b border-black/20 w-full"></div>
          <div className="w-full h-fit grid grid-cols-2 gap-8 px-2 overflow-auto">
            <div className="size-full flex flex-col gap-3">
              <InputWithLabel
                label={"Price"}
                placeholder={"10000"}
                inputProps={{
                  className: "bg-primary-white-100",
                  value: price,
                  onChange: (e) => setPrice(e.target.value),
                  type: "number",
                }}
              />
              {/* <MainSelect
              label={"Outcome item"}
              placeholder={"Select item"}
              options={itemOptions}
              trigerProps={{
                className: "bg-primary-white-100 h-[36px] !border-2",
              }}
            /> */}
              <div className="flex flex-col gap-3">
                <div className="text-[14px] leading-none font-medium">
                  Select Item
                </div>
                <CreatableSelect
                  value={item}
                  options={itemOptions}
                  isClearable={false}
                  onChange={setItem}
                  onCreateOption={(v) => handleCreateItem(v)}
                  className="!text-[14px]"
                  classNames={{
                    control: (state) =>
                      clsx(
                        "!bg-primary-white-100 h-[36px] !border-2 !border-black/5 !text-[14px"
                      ),
                  }}
                />
              </div>
              <InputWithLabel
                label={"Quantity"}
                placeholder={"1"}
                inputProps={{
                  className: "bg-primary-white-100",
                  value: quantity,
                  onChange: (e) => setQuantity(e.target.value),
                  type: "number",
                }}
              />
              <InputWithLabel
                label={"Total Price"}
                placeholder={"0"}
                inputProps={{
                  className: "bg-primary-white-100",
                  readOnly: true,
                  value: totalPrice,
                }}
              />
              <InputWithLabel
                label={"Person In Transaction"}
                placeholder={"John Doe"}
                inputProps={{
                  className: "bg-primary-white-100",
                  value: customerName,
                  onChange: (e) => setCustomerName(e.target.value),
                }}
              />
              <InputWithLabel
                label={"Whatsapp Number"}
                placeholder={"081234567890"}
                inputProps={{
                  className: "bg-primary-white-100",
                  value: whatsapp,
                  onChange: (e) => setWhatsapp(e.target.value),
                }}
              />
            </div>
            <div className="size-full relative">
              <div className="absolute bottom-0 left-0 w-[60%] flex">
                <div className="flex flex-col gap-3 size-full">
                  <div className="text-[14px] leading-none font-medium">
                    Payment Receipt
                  </div>
                  <label
                    htmlFor="receipt"
                    className="cursor-pointer w-full aspect-square border border-dashed flex flex-col text-[12px] p-2"
                  >
                    {console.log(receipt)}
                    {receipt ? (
                      <img
                        src={
                          typeof receipt === "string"
                            ? receipt
                            : URL.createObjectURL(receipt)
                        }
                        className="size-full"
                        alt=""
                      />
                    ) : (
                      <FiUpload className="size-[50%] m-auto text-primary-white-400" />
                    )}
                    <div className="text-black/50 pb-1 text-center">
                      {receipt?.name || "Upload Receipt"}
                    </div>
                    <div
                      type="submit"
                      className="py-1.5 px-3 rounded-md bg-primary-green-100 text-white w-fit mx-auto"
                    >
                      Select File
                    </div>
                  </label>
                  <input
                    type="file"
                    id="receipt"
                    className="hidden"
                    onChange={(e) => setReceipt(e.target.files[0])}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit w-full flex flex-col gap-3">
          <Button
            className={clsx("hover:!bg-primary-green-100 hover:!text-white")}
            onClick={mode === "add" ? handleCreateOutcome : handleEditOutcome}
          >
            {mode === "add" ? "Create" : "Update"}
          </Button>
          <Button
            className="!border-primary-green-100 !border !text-primary-green-100 !bg-white"
            onClick={() => handleSetMode("history")}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="size-full overflow-hidden flex p-4 bg-white rounded-md">
        <div className="size-full flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <div className="w-fit flex flex-col gap-2 leading-none">
              <div className="font-medium text-[18px]">History Outcome</div>
            </div>
            <div className="pr-2">
              <MdHistory className="size-[24px]" />
            </div>
          </div>
          <div className="w-full border-b"></div>
          <div className="size-full overflow-hidden">
            <MainTable
              columns={columns}
              data={tableFixed}
              getRowKey={(row) => row.id}
              className={"table-fixed"}
              isLoading={loadingTableFixed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOutcome;
