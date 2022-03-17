import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false,
    incomes: []
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('income.enabled'),
    incomes: LocalStorage.getItem('income.incomes') || empty().incomes
  }
}

export const current = () => {
  return LocalStorage.getItem('income.enabled') ? restored() : empty()
}
