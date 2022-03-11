import {
  removeElementById,
  updateElementById,
  StorageUtil
} from 'src/services/utils'

import { empty } from 'src/store/asset/presets'

const storageUtil = new StorageUtil(
  'asset',
  empty()
)

const saveAssetsState = (state) => {
  storageUtil.setState('asset', state.assets)
}

export function ACTIVATE (state) {
  state.enabled = true
  storageUtil.setState('enabled', true)
}

export function SET_ASSETS (state, payload) {
  state.assets = payload
  saveAssetsState(state)
}

export function ADD_ASSET (state, payload) {
  state.assets.push(payload)
  saveAssetsState(state)
}

export function UPDATE_ASSET (state, payload) {
  updateElementById(state.assets, payload)
  saveAssetsState(state)
}

export function REMOVE_ASSET (state, payload) {
  removeElementById(state.assets, payload)
  saveAssetsState(state)
}

export function REMOVE_ASSETS (state, payload) {
  for (const element of payload) {
    removeElementById(state.assets, element)
  }
  saveAssetsState(state)
}

export function RESET (state) {
  storageUtil.clearState(state)
}
