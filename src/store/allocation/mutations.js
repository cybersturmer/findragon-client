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

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_ALLOCATIONS (state, payload) {
  state.allocations = payload
  storageUtil.setState('allocations', payload)
}

export function ADD_ALLOCATION (state, payload) {
  state.allocations.push(payload)
  storageUtil.setState('allocations', state.allocations)
}

export function UPDATE_ALLOCATION (state, payload) {
  updateElementById(state.allocations, payload)
  storageUtil.setState('allocations', payload)
}

export function REMOVE_ALLOCATION (state, payload) {
  removeElementById(state.allocations, payload)
  storageUtil.setState('allocations', payload)
}

export function REMOVE_ALLOCATIONS (state, payload) {
  for (const element of payload) {
    removeElementById(state.allocations, element)
  }
  storageUtil.setState('allocations', payload)
}

// @todo Check if it works
export function RESET (state) {
  storageUtil.clearState(state)
}
