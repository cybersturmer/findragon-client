export function INCOMES (state) {
  return state.incomes
}

export function INCOME_BY_ID (state) {
  return incomeId => {
    return state.incomes.filter((income) => income.id === incomeId).pop()
  }
}
