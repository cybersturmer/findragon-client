export function ALLOCATIONS (state) {
  return state.allocations
}

export function ALLOCATIONS_BY_PARENT (state, getters) {
  return parentId => {
    if (parentId == null) {
      return getters.ALLOCATIONS
        .filter((allocation) => allocation.parent_id === null)
    } else {
      return state.allocations
        .filter((allocation) => allocation.id === parentId)[0]?.children
    }
  }
}

export function ALLOCATION_BY_ID (state) {
  return allocationId => {
    return state.allocations.filter((allocation) => allocation.id === allocationId)[0]
  }
}
