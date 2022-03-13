import {
  removeElementById,
  updateElementById,
  StorageUtil
} from 'src/services/utils'

import { empty } from 'src/store/transaction/presets'

const storageUtil = new StorageUtil(
  'transaction',
  empty()
)

const saveTransactionState = (state) => {
  storageUtil.setState('transaction', state.transactions)
}

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_TRANSACTIONS (state, payload) {
  state.transactions = payload
  saveTransactionState(state)
}

export function ADD_TRANSACTION (state, payload) {
  state.transactions.push(payload)
  saveTransactionState(state)
}

export function UPDATE_TRANSACTION (state, payload) {
  updateElementById(state.transactions, payload)
  saveTransactionState(state)
}

export function REMOVE_TRANSACTION (state, payload) {
  removeElementById(state.transactions, payload)
  saveTransactionState(state)
}

export function REMOVE_TRANSACTIONS (state, payload) {
  for (const element of payload) {
    removeElementById(state.transactions, element)
  }
  saveTransactionState(state)
}

export function RESET (state) {
  storageUtil.clearState(state)
}
