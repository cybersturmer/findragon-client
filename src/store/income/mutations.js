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
  storageUtil.setState('income', state.income)
}

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_INCOME (state, payload) {
  state.income = payload
  saveIncomeState(state)
}

export function ADD_INCOME (state, payload) {
  state.income.push(payload)
  saveIncomeState(state)
}

export function UPDATE_INCOME (state, payload) {
  updateElementById(state.income, payload)
  saveIncomeState(state)
}

export function REMOVE_INCOME (state, payload) {
  removeElementById(state.income, payload)
  saveIncomeState(state)
}

export function REMOVE_INCOMES (state, payload) {
  for (const element of payload) {
    removeElementById(state.income, element)
  }
  saveIncomeState(state)
}

export function RESET (state) {
  storageUtil.clearState(state)
}
