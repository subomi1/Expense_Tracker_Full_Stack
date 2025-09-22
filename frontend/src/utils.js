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
  if (amount == null) return "0";
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}