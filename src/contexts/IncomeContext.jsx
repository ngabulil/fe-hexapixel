import {
  apiCreateIncome,
  apiDeleteIncome,
  apiExportIncome,
  apiGetIncomes,
  apiUpdateIncome,
} from "@/services/incomeService";
import {
  apiCreateItemIncome,
  apiGetAllItemIncomes,
} from "@/services/itemIncomeService";
import { closeSwalLoading, swalLoading, swalSuccess } from "@/utils/swalUtils";
import React from "react";

const IncomeContext = React.createContext();
export const useIncomeContext = () => React.useContext(IncomeContext);

const IncomeContextProvider = ({ children }) => {
  const [typeExport, setTypeExport] = React.useState("currMonth"); // currMonth | prevMonth
  const [openReport, setOpenReport] = React.useState(false);
  const [mode, setMode] = React.useState("add"); // add | history | edit
  const [price, setPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [item, setItem] = React.useState(null); // item id
  const [quantity, setQuantity] = React.useState(0);
  const [customerName, setCustomerName] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [itemOptions, setItemOptions] = React.useState([]);
  const [tableFixed, setTableFixed] = React.useState([]);
  const [tableHistory, setTableHistory] = React.useState([]);
  const [paginationHistory, setPaginationHistory] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [loadingInput, setLoadingInput] = React.useState(true);
  const [loadingTableFixed, setLoadingTableFixed] = React.useState(true);
  const [loadingTableHistory, setLoadingTableHistory] = React.useState(true);

  const resetInput = () => {
    setPrice(0);
    setItem("");
    setQuantity(0);
    setCustomerName("");
    setTotalPrice(0);
    setWhatsapp("");
    setSelectedRow(null);
  };
  const handleSetModeEdit = (row) => {
    setSelectedRow(row);
    setMode("edit");
    setPrice(row.price);
    setItem({
      value: row.item._id,
      label: row.item.name,
    });
    setQuantity(row.quantity);
    setCustomerName(row.customerName);
    setWhatsapp(row.whatsapp);
  };
  const handleSetMode = (mode) => setMode(mode);
  const handleGetTableHistory = async (params) => {
    setLoadingTableHistory(true);
    try {
      const formatParams = {
        ...(paginationHistory && paginationHistory),
        ...(search && { search }),
        ...params,
      };
      const response = await apiGetIncomes(formatParams);
      setTableHistory(response.result);
      setPaginationHistory(response.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTableHistory(false);
    }
  };
  const handleDownloadReportIncome = async () => {
    swalLoading();
    try {
      await apiExportIncome(typeExport);
      swalSuccess("Report successfully downloaded!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleCreateIncome = async () => {
    swalLoading();
    try {
      await apiCreateIncome({
        price,
        item: item?.value,
        quantity,
        customerName,
        whatsapp,
        totalPrice,
      });
      await handleGetTableFixed();
      swalSuccess("Income successfully added!");
      resetInput();
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleGetItemOptions = async () => {
    setLoadingInput(true);
    try {
      const response = await apiGetAllItemIncomes();
      setItemOptions(
        response.result.map((item) => ({
          ...item,
          id: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingInput(false);
    }
  };
  const handleGetTableFixed = async () => {
    setLoadingTableFixed(true);
    try {
      const response = await apiGetIncomes({
        page: 1,
        limit: 10,
      });
      setTableFixed(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTableFixed(false);
    }
  };
  const handleDeleteIncome = async (id) => {
    swalLoading();
    try {
      await apiDeleteIncome(id);
      await handleGetTableHistory();
      swalSuccess("Income successfully deleted!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleEditIncome = async () => {
    swalLoading();
    try {
      await apiUpdateIncome(selectedRow.id, {
        price,
        item: item?.value,
        quantity,
        customerName,
        whatsapp,
        totalPrice,
      });
      setMode("history");
      swalSuccess("Income successfully updated!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleCreateItem = async (input) => {
    swalLoading();
    try {
      await apiCreateItemIncome({
        name: input,
      });
      await handleGetItemOptions();
      swalSuccess("Item successfully added!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };

  const valueContext = {
    openReport,
    setOpenReport,
    typeExport,
    setTypeExport,
    mode,
    setMode,
    price,
    setPrice,
    search,
    setSearch,
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
    handleDownloadReportIncome,
    handleCreateIncome,
    handleGetItemOptions,
    handleGetTableFixed,
    handleGetTableHistory,
    handleDeleteIncome,
    handleEditIncome,
    handleCreateItem,
  };

  React.useEffect(() => {
    if (mode === "add") {
      resetInput();
    }
  }, [mode]);

  return (
    <IncomeContext.Provider value={valueContext}>
      {children}
    </IncomeContext.Provider>
  );
};
export default IncomeContextProvider;
