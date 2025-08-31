import { createData, getData, updateData, deleteData } from "./api"; // Menggunakan helper functions yang sudah ada

// 📊 Export Income (currMonth | prevMonth)
export const apiExportIncome = async (type) => {
    try {
        const response = await getData(`/incomes/export/${type}`, true, { responseType: "blob" });

        // Membuat URL sementara untuk file yang diterima
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `income-${type}.xlsx`; // Menentukan nama file yang diunduh
        link.click(); // Memulai pengunduhan
        link.remove();
        // Membersihkan URL sementara
        URL.revokeObjectURL(link.href);

    } catch (error) {
        console.log("Error exporting income:", error);
        throw error;
    }
};

// 💰 Create Income (POST)
export const apiCreateIncome = async (incomeData) => {
    try {
        const response = await createData("/incomes", incomeData, true); // Menggunakan POST dengan token
        return response;
    } catch (error) {
        console.log("Error creating income:", error);
        throw error;
    }
};

// 📄 Get All Incomes (GET)
export const apiGetIncomes = async (params = {}) => {
    try {
        const response = await getData("/incomes", true, { params }); // Mengambil daftar income dengan query params dan token
        return response;
    } catch (error) {
        console.log("Error fetching incomes:", error);
        throw error;
    }
};

// 👤 Get Income by ID (GET)
export const apiGetIncomeById = async (id) => {
    try {
        const response = await getData(`/incomes/${id}`, true); // Mengambil detail income berdasarkan ID dengan token
        return response;
    } catch (error) {
        console.log("Error fetching income by ID:", error);
        throw error;
    }
};

// ✏️ Update Income (PUT)
export const apiUpdateIncome = async (id, incomeData) => {
    try {
        const response = await updateData(`/incomes/${id}`, incomeData, true); // Menggunakan PUT dengan token
        return response;
    } catch (error) {
        console.log("Error updating income:", error);
        throw error;
    }
};

// 🗑️ Delete Income (DELETE)
export const apiDeleteIncome = async (id) => {
    try {
        const response = await deleteData(`/incomes/${id}`, true); // Menghapus income berdasarkan ID dengan token
        return response;
    } catch (error) {
        console.log("Error deleting income:", error);
        throw error;
    }
};
