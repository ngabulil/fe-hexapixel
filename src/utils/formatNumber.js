// Fungsi untuk format angka pakai titik ribuan
export function formatRibuan(angka) {
  return angka.toLocaleString("id-ID");
}

// Fungsi untuk format angka jadi Rupiah
export function formatRupiah(angka) {
  return angka.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0 // biar ga ada ",00"
  });
}