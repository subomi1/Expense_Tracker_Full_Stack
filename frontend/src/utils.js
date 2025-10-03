// export const formattedAmount = new Intl.NumberFormat("en-NG", {
//   style: "currency",
//   currency: "NGN",
// }).format(amount);

export function formatCurrency(amount) {
  if (amount == null) return "₦0";
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatAmount(amount) {
  if (Number.isNaN(amount)) return "0";
  if (amount == null) return "0";
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
  }
  return colors;
}
