export function imageFileError(file: File, maxMb: number): string | null {
  if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
    return "Format gambar harus JPEG, PNG, atau WebP.";
  }
  if (file.size > maxMb * 1024 * 1024) {
    return `Ukuran gambar maksimal ${maxMb} MB.`;
  }
  return null;
}