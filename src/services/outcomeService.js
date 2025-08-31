import { createData, getData, updateData, deleteData } from "./api"; // Menggunakan helper functions yang sudah ada

// 📥 Create Outcome (POST) - Includes file (receipt)
export const apiCreateOutcome = async (outcomeData) => {
    try {
        const response = await createData("/outcomes", outcomeData, true); // Menggunakan POST dengan token
        return response;
    } catch (error) {
        console.log("Error creating outcome:", error);
        throw error
    }
};

// 📄 Get All Outcomes (GET)
export const apiGetOutcomes = async (params = {}) => {
    try {
        const response = await getData("/outcomes", true, { params }); // Mengambil daftar outcome dengan query params dan token
        return response;
    } catch (error) {
        console.log("Error fetching outcomes:", error);
        throw error
    }
};

// 📝 Get Outcome by ID (GET)
export const apiGetOutcomeById = async (id) => {
    try {
        const response = await getData(`/outcomes/${id}`, true); // Mengambil data outcome berdasarkan ID
        return response;
    } catch (error) {
        console.log("Error fetching outcome by ID:", error);
        throw error
    }
};

// ✏️ Update Outcome (PUT) - Includes file (receipt)
export const apiUpdateOutcome = async (id, outcomeData) => {
    try {
        const response = await updateData(`/outcomes/${id}`, outcomeData, true); // Menggunakan PUT dengan token
        return response;
    } catch (error) {
        console.log("Error updating outcome:", error);
        throw error
    }
};

// 🗑️ Delete Outcome (DELETE)
export const apiDeleteOutcome = async (id) => {
    try {
        const response = await deleteData(`/outcomes/${id}`, true); // Menghapus outcome berdasarkan ID dengan token
        return response;
    } catch (error) {
        console.log("Error deleting outcome:", error);
        throw error
    }
};

export const apiExportOutcomesByMonth = async (monthType) => {
    try {
        const response = await getData(`/outcomes/export/${monthType}`, true, { responseType: 'blob' }); // Mengambil data export berdasarkan tipe bulan

        // Membuat URL sementara untuk file yang diterima
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `outcomes-${monthType}.xlsx`; // Nama file yang diunduh
        link.click(); // Memulai pengunduhan
        link.remove();
        // Membersihkan URL sementara
        URL.revokeObjectURL(link.href);

    } catch (error) {
        console.log("Error exporting outcomes:", error);
        throw error
    }
};

