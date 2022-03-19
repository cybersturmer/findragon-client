export const transactionTypesEnum = {
  BUY: 1,
  SELL: 2
}

export const allocationTypesEnum = {
  ASSET: 1,
  CATEGORY: 2,
  CURRENCY: 3
}

export const assetTypesEnum = {
  SHARE: 1,
  BOND: 2,
  FUND: 3
}

export const incomeTypesEnum = {
  DIVIDENDS: 1,
  SHARES: 2,
  COUPONS: 3,
  OTHER: 4
}

export const incomesOptions = [
  {
    label: 'Dividends',
    value: incomeTypesEnum.DIVIDENDS
  },
  {
    label: 'Shares',
    value: incomeTypesEnum.SHARES
  },
  {
    label: 'Coupons',
    value: incomeTypesEnum.COUPONS
  },
  {
    label: 'Other',
    value: incomeTypesEnum.OTHER
  }
]

export const currenciesOptions = [
  { label: 'RUB', value: 'RUB' },
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'AUD', value: 'AUD' },
  { label: 'CAD', value: 'CAD' },
  { label: 'CHF', value: 'CHF' },
  { label: 'CNY', value: 'CNY' },
  { label: 'CZK', value: 'CZK' },
  { label: 'GBP', value: 'GBP' },
  { label: 'HKD', value: 'HKD' },
  { label: 'ILS', value: 'ILS' },
  { label: 'JPY', value: 'JPY' },
  { label: 'KZT', value: 'KZT' },
  { label: 'PLN', value: 'PLN' },
  { label: 'SEK', value: 'SEK' },
  { label: 'SGD', value: 'SGD' },
  { label: 'TRY', value: 'TRY' },
  { label: 'UAH', value: 'UAH' }
]
