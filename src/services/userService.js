import { createData, getData, updateData, deleteData } from "./api"; // Menggunakan helper functions yang sudah ada

// 📷 Create User with Photo (POST)
export const apiCreateUser = async (userData) => {
    try {
        // Panggil createData dengan data yang sudah diproses di luar service ini (termasuk photo)
        const response = await createData("/users", userData, true); // Menggunakan POST dengan token
        return response;
    } catch (error) {
        console.log("Error creating user:", error);
        throw error
    }
};

// 📄 Get All Users (GET)
export const apiGetAllUsers = async (params) => {
    try {
        const response = await getData("/users", true, { params }); // Mengambil daftar semua pengguna dengan token
        return response;
    } catch (error) {
        console.log("Error fetching users:", error);
        throw error
    }
};

// 👤 Get User by ID (GET)
export const apiGetUserById = async (id) => {
    try {
        const response = await getData(`/users/${id}`, true); // Mengambil data pengguna berdasarkan ID
        return response;
    } catch (error) {
        console.log("Error fetching user:", error);
        throw error
    }
};

// ✏️ Update User (PUT)
export const apiUpdateUser = async (id, userData) => {
    try {
        const response = await updateData(`/users/${id}`, userData, true); // Menggunakan PUT dengan token
        return response;
    } catch (error) {
        console.log("Error updating user:", error);
        throw error
    }
};

// 🗑️ Delete User (DELETE)
export const apiDeleteUser = async (id) => {
    try {
        const response = await deleteData(`/users/${id}`, true); // Menghapus pengguna berdasarkan ID dengan token
        return response;
    } catch (error) {
        console.log("Error deleting user:", error);
        throw error
    }
};

// 🔑 Reset User Password (PUT)
export const apiResetUserPassword = async (id, newPassword) => {
    try {
        const response = await updateData(`/users/${id}/reset-password`, { password: newPassword }, true); // Mengubah password pengguna berdasarkan ID
        return response;
    } catch (error) {
        console.log("Error resetting password:", error);
        throw error
    }
};
