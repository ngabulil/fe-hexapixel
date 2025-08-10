import { handleLogout } from "@/utils/logout";
import { getData, updateData } from "./api"; // Pastikan kamu sudah memiliki helper untuk `getData` dan `updateData`.
import { swalSuccess } from "@/utils/swalUtils";

// 🧑‍💻 Get Profile (GET /users/me)
export const apiGetProfile = async () => {
    try {
        const response = await getData('/users/me', true); // Mengambil data profil pengguna dengan token
        return response;
    } catch (error) {
        console.log('Error fetching profile:', error);
        throw error
    }
};

// 🔐 Change Password (PUT /users/me/change-password)
export const apiChangePassword = async (oldPassword, newPassword) => {
    try {
        const response = await updateData('/users/me/change-password', { oldPassword, newPassword }, true); // Mengirimkan oldPassword dan newPassword
        swalSuccess(response.message);
        handleLogout();
    } catch (error) {
        console.log('Error changing password:', error);
        throw error
    }
};
