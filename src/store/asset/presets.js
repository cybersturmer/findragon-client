import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false,
    assets: []
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('asset.enabled'),
    allocations: LocalStorage.getItem('asset.assets') || empty().allocations
  }
}

export const current = () => {
  return LocalStorage.getItem('asset.enabled') ? restored() : empty()
}
