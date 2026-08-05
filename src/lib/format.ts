const persianNumber = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 0,
});

export function formatPersianNumber(value: number): string {
  return persianNumber.format(value);
}
