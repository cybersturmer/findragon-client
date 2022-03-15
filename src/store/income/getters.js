export function INCOME (state) {
  return state.income
}

export function INCOME_BY_ID (state) {
  return incomeId => {
    return state.income.filter((income) => income.id === incomeId).pop()
  }
}
