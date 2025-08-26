export function formatSize(size: number): string {
  if (size < 1024) return size + " B";
  if (size < 1024 ** 2) return (size / 1024).toFixed(1) + " KB";
  if (size < 1024 ** 3) return (size / 1024 ** 2).toFixed(1) + " MB";
  return (size / 1024 ** 3).toFixed(1) + " GB";
}