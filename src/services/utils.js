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

export function getElementById (array, id) {
  return array.find(_el => _el.id === id)
}

export function removeElement (array, element) {
  const index = array.indexOf(element)
  if (index <= -1) throw new Error('Requested array do not contain given element')

  array.splice(index, 1)
  return array
}

export function removeElementById (array, element) {
  const arrayElement = array.find(_element => element.id === _element.id)
  const index = array.indexOf(arrayElement)
  if (index <= -1) throw new Error('Requested array do not contain given element')

  array.splice(index, 1)
  return array
}

export function updateElement (array, oldElement, newElement) {
  const oldIndex = array.indexOf(oldElement)
  if (oldIndex <= -1) throw new Error('Requested array do not contain given element')

  array.splice(oldIndex, 1, newElement)
}

export function updateElementById (array, newElement) {
  const oldElement = array.find(element => element.id === newElement.id)
  updateElement(array, oldElement, newElement)
}
