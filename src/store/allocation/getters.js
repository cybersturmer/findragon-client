export function ALLOCATIONS (state) {
  return state.allocations
}

export function ALLOCATIONS_BY_PARENT (state, getters) {
  return parentId => {
    if (parentId == null) {
      return getters.ALLOCATIONS
    } else {
      return state.allocations
        .filter((allocation) => allocation.id === parentId)[0].children
    }
  }
}
