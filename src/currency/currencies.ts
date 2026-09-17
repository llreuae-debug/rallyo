export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'SAR' | 'PKR' | 'QAR' | 'KWD' | 'BHD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  decimals: number; // 2 for USD/EUR/AED, 3 for KWD/BHD, 0 for JPY
  rateAgainstUSD: number; // 1 USD = rate in this currency
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', decimals: 2, rateAgainstUSD: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', decimals: 2, rateAgainstUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', decimals: 2, rateAgainstUSD: 0.79 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪', decimals: 2, rateAgainstUSD: 3.6725 },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', decimals: 2, rateAgainstUSD: 3.75 },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰', decimals: 2, rateAgainstUSD: 278.50 },
  QAR: { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦', decimals: 2, rateAgainstUSD: 3.64 },
  KWD: { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', flag: '🇰🇼', decimals: 3, rateAgainstUSD: 0.308 },
  BHD: { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar', flag: '🇧🇭', decimals: 3, rateAgainstUSD: 0.376 }
};

/**
 * Converts minor integer units from one currency to another using exchange rates.
 */
export function convertMinorAmount(
  amountMinor: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number {
  if (fromCurrency === toCurrency) return amountMinor;

  const fromCfg = CURRENCIES[fromCurrency];
  const toCfg = CURRENCIES[toCurrency];

  // Convert from minor units to standard units in source
  const standardFrom = amountMinor / Math.pow(10, fromCfg.decimals);

  // Convert to USD base
  const amountUSD = standardFrom / fromCfg.rateAgainstUSD;

  // Convert from USD to target standard units
  const standardTo = amountUSD * toCfg.rateAgainstUSD;

  // Convert back to target minor units (rounded to nearest integer)
  return Math.round(standardTo * Math.pow(10, toCfg.decimals));
}

/**
 * Formats an integer minor unit amount into a localized currency string.
 * Example: formatMinorAmount(24000, 'AED', 'en') -> "240.00 AED" or "AED 240.00"
 */
export function formatMinorAmount(
  amountMinor: number,
  currencyCode: CurrencyCode,
  localeCode: string = 'en'
): string {
  const cfg = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const majorValue = amountMinor / Math.pow(10, cfg.decimals);

  try {
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: cfg.decimals,
      maximumFractionDigits: cfg.decimals
    }).format(majorValue);
  } catch (e) {
    // Fallback manual formatting
    return `${cfg.symbol} ${majorValue.toFixed(cfg.decimals)}`;
  }
}
