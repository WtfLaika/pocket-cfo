export function formatMoney(amount: number, currency = "$") {
  const absolute = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (amount < 0) return `-${currency}${absolute}`;
  return `${currency}${absolute}`;
}

export function formatSignedMoney(amount: number, currency = "$") {
  const value = formatMoney(amount, currency);
  return amount > 0 ? `+${value}` : value;
}

export function getInitials(value: string) {
  return value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
