// Supported currencies
export const CURRENCIES = [
  { code: "IDR", label: "IDR – Indonesian Rupiah",    symbol: "Rp",  locale: "id-ID" },
  { code: "USD", label: "USD – US Dollar",             symbol: "$",   locale: "en-US" },
  { code: "EUR", label: "EUR – Euro",                  symbol: "€",   locale: "de-DE" },
  { code: "GBP", label: "GBP – British Pound",         symbol: "£",   locale: "en-GB" },
  { code: "JPY", label: "JPY – Japanese Yen",          symbol: "¥",   locale: "ja-JP" },
  { code: "AUD", label: "AUD – Australian Dollar",     symbol: "A$",  locale: "en-AU" },
  { code: "SGD", label: "SGD – Singapore Dollar",      symbol: "S$",  locale: "en-SG" },
  { code: "MYR", label: "MYR – Malaysian Ringgit",     symbol: "RM",  locale: "ms-MY" },
  { code: "THB", label: "THB – Thai Baht",             symbol: "฿",   locale: "th-TH" },
  { code: "CNY", label: "CNY – Chinese Yuan",          symbol: "¥",   locale: "zh-CN" },
  { code: "KRW", label: "KRW – South Korean Won",      symbol: "₩",   locale: "ko-KR" },
  { code: "HKD", label: "HKD – Hong Kong Dollar",      symbol: "HK$", locale: "zh-HK" },
  { code: "CAD", label: "CAD – Canadian Dollar",       symbol: "C$",  locale: "en-CA" },
  { code: "CHF", label: "CHF – Swiss Franc",           symbol: "Fr",  locale: "de-CH" },
];

// Currencies that use no decimal places
const NO_DECIMAL = ["IDR", "JPY", "KRW"];

/**
 * Format a number as currency.
 * @param {number} amount
 * @param {string} currencyCode  e.g. "IDR"
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = "IDR") {
  const decimals = NO_DECIMAL.includes(currencyCode) ? 0 : 2;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    // Fallback for unknown codes
    const cur = CURRENCIES.find((c) => c.code === currencyCode);
    return `${cur?.symbol ?? currencyCode} ${amount.toLocaleString()}`;
  }
}
