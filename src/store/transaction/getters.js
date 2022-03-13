export function TRANSACTIONS (state) {
  return state.transactions
}

export function TRANSACTION_BY_ID (state) {
  return transactionId => {
    return state.transactions.filter((transaction) => transaction.id === transactionId).pop()
  }
}
