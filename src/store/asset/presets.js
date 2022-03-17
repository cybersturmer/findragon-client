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
    assets: LocalStorage.getItem('asset.assets') || empty().assets
  }
}

export const current = () => {
  return LocalStorage.getItem('asset.enabled') ? restored() : empty()
}
