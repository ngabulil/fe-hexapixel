import {
  apiCreateOutcome,
  apiDeleteOutcome,
  apiExportOutcomesByMonth,
  apiGetOutcomes,
  apiUpdateOutcome,
} from "@/services/outcomeService";
import { apiGetAllItemOutcomes } from "@/services/itemOutcomeService";
import { closeSwalLoading, swalLoading, swalSuccess } from "@/utils/swalUtils";
import React from "react";

const OutcomeContext = React.createContext();
export const useOutcomeContext = () => React.useContext(OutcomeContext);

const OutcomeContextProvider = ({ children }) => {
  const [typeExport, setTypeExport] = React.useState("currMonth"); // currMonth | prevMonth
  const [mode, setMode] = React.useState("add"); // add | history | edit
  const [price, setPrice] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [item, setItem] = React.useState(""); // item id
  const [quantity, setQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [customerName, setCustomerName] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [receipt, setReceipt] = React.useState(null); // file
  const [itemOptions, setItemOptions] = React.useState([]);
  const [tableFixed, setTableFixed] = React.useState([]);
  const [tableHistory, setTableHistory] = React.useState([]);
  const [paginationHistory, setPaginationHistory] = React.useState(null);
  const [loadingInput, setLoadingInput] = React.useState(true);
  const [loadingTableFixed, setLoadingTableFixed] = React.useState(true);
  const [loadingTableHistory, setLoadingTableHistory] = React.useState(true);

  const resetInput = () => {
    setPrice(0);
    setItem("");
    setQuantity(0);
    setCustomerName("");
    setWhatsapp("");
    setReceipt(null);
    setSelectedRow(null);
    setTotalPrice(0);
  };
  const handleSetModeEdit = (row) => {
    setSelectedRow(row);
    setMode("edit");
    setPrice(row.price);
    setItem(row.item);
    setQuantity(row.quantity);
    setCustomerName(row.customerName);
    setWhatsapp(row.whatsapp);
    setReceipt(row.receipt);
  };
  const handleSetMode = (mode) => setMode(mode);
  const handleGetTableHistory = async (params) => {
    setLoadingTableHistory(true);
    try {
      const formatParams = {
        ...(paginationHistory && paginationHistory.queryParams),
        ...(search && { search }),
        ...params,
      };
      const response = await apiGetOutcomes(formatParams);
      setTableHistory(response.result);
      setPaginationHistory(response.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTableHistory(false);
    }
  };
  const handleDownloadReportOutcome = async () => {
    swalLoading();
    try {
      await apiExportOutcomesByMonth(typeExport);
      swalSuccess("Report successfully downloaded!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleCreateOutcome = async () => {
    swalLoading();
    try {
      const formData = new FormData();
      formData.append("price", price);
      formData.append("item", item);
      formData.append("quantity", quantity);
      formData.append("customerName", customerName);
      formData.append("whatsapp", whatsapp);
      formData.append("receipt", receipt);
      await apiCreateOutcome(formData);
      await handleGetTableHistory();
      swalSuccess("Outcome successfully added!");
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
      const response = await apiGetAllItemOutcomes();
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
      const response = await apiGetOutcomes({
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
  const handleDeleteOutcome = async (id) => {
    swalLoading();
    try {
      await apiDeleteOutcome(id);
      await handleGetTableHistory();
      swalSuccess("Outcome successfully deleted!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };
  const handleEditOutcome = async () => {
    swalLoading();
    try {
      const formData = new FormData();
      formData.append("price", price);
      formData.append("item", item);
      formData.append("quantity", quantity);
      formData.append("customerName", customerName);
      formData.append("whatsapp", whatsapp);
      formData.append("totalPrice", totalPrice);
      if (receipt instanceof File) {
        formData.append("receipt", receipt); // Mengirim file receipt jika ada
      }
      await apiUpdateOutcome(selectedRow.id, formData);
      await handleGetTableHistory();
      swalSuccess("Outcome successfully updated!");
    } catch (error) {
      console.log(error);
    } finally {
      closeSwalLoading();
    }
  };

  const valueContext = {
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
    receipt,
    setReceipt,
    totalPrice,
    setTotalPrice,
    selectedRow,
    setSelectedRow,
    itemOptions,
    setItemOptions,
    tableFixed,
    setTableFixed,
    tableHistory,
    setTableHistory,
    paginationHistory,
    setPaginationHistory,
    loadingInput,
    loadingTableFixed,
    loadingTableHistory,
    resetInput,
    handleSetMode,
    handleSetModeEdit,
    handleDownloadReportOutcome,
    handleCreateOutcome,
    handleGetItemOptions,
    handleGetTableFixed,
    handleGetTableHistory,
    handleDeleteOutcome,
    handleEditOutcome,
  };

  React.useEffect(() => {
    if (mode === "add") {
      resetInput();
    }
  }, [mode]);

  return (
    <OutcomeContext.Provider value={valueContext}>
      {children}
    </OutcomeContext.Provider>
  );
};
export default OutcomeContextProvider;
