import {
  removeElementById,
  updateElementById,
  StorageUtil
} from 'src/services/utils'

import { empty } from 'src/store/allocation/presets'

const storageUtil = new StorageUtil(
  'allocation',
  empty()
)

const saveAllocationsState = (state) => {
  storageUtil.setState('allocations', state.allocations)
}

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_ALLOCATIONS (state, payload) {
  state.allocations = payload
  saveAllocationsState(state)
}

export function ADD_ALLOCATION (state, payload) {
  state.allocations.push(payload)
  saveAllocationsState(state)
}

export function UPDATE_ALLOCATION (state, payload) {
  updateElementById(state.allocations, payload)
  saveAllocationsState(state)
}

export function REMOVE_ALLOCATION (state, payload) {
  removeElementById(state.allocations, payload)
  saveAllocationsState(state)
}

export function REMOVE_ALLOCATIONS (state, payload) {
  for (const element of payload) {
    removeElementById(state.allocations, element)
  }
  saveAllocationsState(state)
}

// @todo Check if it works
export function RESET (state) {
  storageUtil.clearState(state)
}
