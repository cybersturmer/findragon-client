import {
  removeElementById,
  updateElementById,
  StorageUtil
} from 'src/services/utils'

import { empty } from 'src/store/asset/presets'

const storageUtil = new StorageUtil(
  'income',
  empty()
)

const saveIncomeState = (state) => {
  storageUtil.setState('incomes', state.incomes)
}

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_INCOMES (state, payload) {
  state.incomes = payload
  saveIncomeState(state)
}

export function ADD_INCOME (state, payload) {
  state.incomes.push(payload)
  saveIncomeState(state)
}

export function UPDATE_INCOME (state, payload) {
  updateElementById(state.incomes, payload)
  saveIncomeState(state)
}

export function REMOVE_INCOME (state, payload) {
  removeElementById(state.incomes, payload)
  saveIncomeState(state)
}

export function REMOVE_INCOMES (state, payload) {
  for (const element of payload) {
    removeElementById(state.incomes, element)
  }
  saveIncomeState(state)
}

export function RESET (state) {
  storageUtil.clearState(state)
}
