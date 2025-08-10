import { createData, getData, updateData, deleteData } from "./api"; // Menggunakan helper functions yang sudah ada

// 📥 Create Item Outcome (POST)
export const apiCreateItemOutcome = async (itemOutcomeData) => {
    try {
        const response = await createData("/item-outcomes", itemOutcomeData, true); // Menggunakan POST dengan token
        return response;
    } catch (error) {
        console.log("Error creating item outcome:", error);
        throw error
    }
};

// 📄 Get All Item Outcomes (GET)
export const apiGetAllItemOutcomes = async () => {
    try {
        const response = await getData("/item-outcomes", true); // Mengambil daftar item outcomes dengan query params dan token
        return response;
    } catch (error) {
        console.log("Error fetching item outcomes:", error);
        throw error
    }
};

// ✏️ Update Item Outcome (PUT)
export const apiUpdateItemOutcome = async (id, itemOutcomeData) => {
    try {
        const response = await updateData(`/item-outcomes/${id}`, itemOutcomeData, true); // Menggunakan PUT dengan token
        return response;
    } catch (error) {
        console.log("Error updating item outcome:", error);
        throw error
    }
};

// 🗑️ Delete Item Outcome (DELETE)
export const apiDeleteItemOutcome = async (id) => {
    try {
        const response = await deleteData(`/item-outcomes/${id}`, true); // Menghapus item outcome berdasarkan ID dengan token
        return response;
    } catch (error) {
        console.log("Error deleting item outcome:", error);
        throw error
    }
};
