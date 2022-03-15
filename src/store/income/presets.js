import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false,
    income: []
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('income.enabled'),
    allocations: LocalStorage.getItem('income.income') || empty().allocations
  }
}

export const current = () => {
  return LocalStorage.getItem('income.enabled') ? restored() : empty()
}
