import Swal from "sweetalert2";

export type ToastType = "success" | "error" | "info" | "warning";

/** Toast ala panel admin kelurahanpabuaran (SweetAlert2, top-end, 2.5s). */
export function toast(message: string, type: ToastType = "success") {
  void Swal.fire({
    icon: type,
    title: message,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
}

/** Modal konfirmasi hapus ala kelurahanpabuaran. */
export function confirmDelete(message?: string): Promise<boolean> {
  return Swal.fire({
    title: "Konfirmasi",
    text: message ?? "Data yang dihapus tidak dapat dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#dc2626",
  }).then((result) => result.isConfirmed);
}
