import { StorageUtil } from 'src/services/utils'
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
