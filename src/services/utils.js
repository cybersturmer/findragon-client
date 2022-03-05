import { LocalStorage } from 'quasar'

export class StorageUtil {
  constructor(module, emptyState) {
    this.$module = module
    this.$emptyState = emptyState
  }

  setState(key, data) {
    LocalStorage.set(`${ this.$module }.${ key }`, data)
  }

  removeState(key) {
    LocalStorage.remove(`${ this.$module }.${ key }`)
  }

  clearState(state) {
    for (const key of this.$emptyState) {
      this.removeState(key)
    }

    Object.assign(state, this.$emptyState)
  }
}
