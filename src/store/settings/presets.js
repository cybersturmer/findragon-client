import { LocalStorage } from 'quasar'

export const empty = () => {
  return {
    enabled: false
  }
}

export const restored = () => {
  return {
    enabled: LocalStorage.getItem('settings.enabled')
  }
}

export const current = () => {
  return LocalStorage.getItem('settings.enabled') ? restored() : empty()
}
