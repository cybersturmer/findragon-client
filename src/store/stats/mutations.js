import {
  removeElementById,
  updateElementById,
  StorageUtil
} from 'src/services/utils'

import { empty } from 'src/store/allocation/presets'

const storageUtil = new StorageUtil(
  'stats',
  empty()
)

const saveAssetsState = (state) => {
  storageUtil.setState('assets', state.assets)
}

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_ASSETS (state, payload) {
  state.assets = payload
  saveAssetsState(state)
}

export function RESET (state) {
  storageUtil.clearState(state)
}
