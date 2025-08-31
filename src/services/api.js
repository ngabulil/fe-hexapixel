import axios from "axios";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import Swal from "sweetalert2"; // Pastikan kamu sudah menginstal sweetalert2
import { delay } from "@/utils/delay";

const BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Fungsi untuk menangani respons dengan token atau tanpa token
const apiRequest = async (method, url, data, withToken = false, options = {}) => {
  await delay(1000);
  // Mendapatkan token dari localStorage jika dibutuhkan
  const token = withToken ? getLocalStorage("token") : null;

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers: withToken ? { Authorization: `Bearer ${token}` } : {},
      ...options,  // Menambahkan opsi tambahan dari parameter
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Jika status 401 Unauthorized, arahkan ke login dan hapus token
      if (error.response.status === 401) {
        Swal.fire({
          title: "Session Expired",
          text: "Your session has expired, please log in again.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          removeLocalStorage("token"); // Menghapus token
          window.location.href = "/login"; // Arahkan ke halaman login menggunakan window.location
        });
      } else {
        // Menangani kesalahan selain 401
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "An error occurred.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      // Menangani kesalahan jaringan atau lainnya
      Swal.fire({
        title: "Network Error",
        text: "There was a problem connecting to the server. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    throw error;
  }
};

// Fungsi GET yang telah dimodifikasi untuk mendukung pengunduhan file
export const getData = async (url, withToken = false, options = {}) => {
  return await apiRequest("GET", url, undefined, withToken, options);
};

// CRUD Methods
// Create
export const createData = async (url, data, withToken = false, options) => {
  return await apiRequest("POST", url, data, withToken, options);
};

// Update
export const updateData = async (url, data, withToken = false, options) => {
  return await apiRequest("PUT", url, data, withToken, options);
};

// Delete
export const deleteData = async (url, withToken = false, options) => {
  return await apiRequest("DELETE", url, undefined, withToken, options);
};

// Export axiosInstance if needed for other use cases
export default axiosInstance;
