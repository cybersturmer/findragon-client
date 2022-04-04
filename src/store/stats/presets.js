import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false,
    assets: []
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('stats.enabled'),
    assets: LocalStorage.getItem('stats.assets') || empty().assets
  }
}

export const current = () => {
  return LocalStorage.getItem('stats.enabled') ? restored() : empty()
}
