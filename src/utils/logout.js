import { removeLocalStorage } from "./localStorage";

export const handleLogout = () => {
  // Hapus token dari localStorage
  removeLocalStorage("token"); // Ganti dengan key token yang kamu gunakan

  // Arahkan pengguna ke halaman login tanpa menambahkannya ke history
  window.location.replace("/login"); // Mengarahkan pengguna ke halaman login dan mengganti halaman saat ini
};
