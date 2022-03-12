import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false,
    transactions: []
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('transaction.enabled'),
    transactions: LocalStorage.getItem('transaction.transactions') || empty().transactions
  }
}

export const current = () => {
  return LocalStorage.getItem('transaction.enabled') ? restored() : empty()
}
