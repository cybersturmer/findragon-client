import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false,
    allocations: []
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('allocation.enabled'),
    allocations: LocalStorage.getItem('allocation.allocations') || empty().allocations
  }
}

export const current = () => {
  return LocalStorage.getItem('allocation.enabled') ? restored() : empty()
}
