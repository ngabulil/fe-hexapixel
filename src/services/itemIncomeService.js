import { createData, getData, updateData, deleteData } from "./api"; // Menggunakan helper functions yang sudah ada

// 📥 Create Item Income (POST)
export const apiCreateItemIncome = async (itemIncomeData) => {
    try {
        const response = await createData("/item-incomes", itemIncomeData, true); // Menggunakan POST dengan token
        return response;
    } catch (error) {
        console.log("Error creating item income:", error);
        throw error
    }
};

// 📄 Get All Item Incomes (GET)
export const apiGetAllItemIncomes = async () => {
    try {
        const response = await getData("/item-incomes", true); // Mengambil daftar item incomes dengan query params dan token
        return response;
    } catch (error) {
        console.log("Error fetching item incomes:", error);
        throw error
    }
};

// ✏️ Update Item Income (PUT)
export const apiUpdateItemIncome = async (id, itemIncomeData) => {
    try {
        const response = await updateData(`/item-incomes/${id}`, itemIncomeData, true); // Menggunakan PUT dengan token
        return response;
    } catch (error) {
        console.log("Error updating item income:", error);
        throw error
    }
};

// 🗑️ Delete Item Income (DELETE)
export const apiDeleteItemIncome = async (id) => {
    try {
        const response = await deleteData(`/item-incomes/${id}`, true); // Menghapus item income berdasarkan ID dengan token
        return response;
    } catch (error) {
        console.log("Error deleting item income:", error);
        throw error
    }
};
