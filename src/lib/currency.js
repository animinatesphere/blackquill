export function formatNaira(amount) {
  if (amount === null || amount === undefined) return "POA";
  return `₦${Number(amount).toLocaleString("en-NG")}`;
}

export function formatUsd(amountNGN, usdRate) {
  if (amountNGN === null || amountNGN === undefined || !usdRate) return null;
  const usd = amountNGN / usdRate;
  return `$${usd.toLocaleString("en-US", {
    maximumFractionDigits: usd >= 100 ? 0 : 2,
  })}`;
}
