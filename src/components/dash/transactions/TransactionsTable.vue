<template>
  <q-table
    :columns="columns"
    :rows="row" />
</template>

<script>
const transactionTypesMapping = {
  1: 'Buy',
  2: 'Sell',
  3: 'Dividends',
  4: 'Coupons'
}

const columns = [
  {
    name: 'type',
    required: true,
    label: 'Transaction',
    align: 'left',
    field: (row) => row.type,
    format: (val) => `${transactionTypesMapping[val]}`,
    sortable: true
  },
  {
    name: 'asset',
    required: true,
    label: 'Asset',
    align: 'left',
    field: (row) => row.asset.description,
    format: (val) => `${val}`
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: (row) => row.amount,
    format: (val) => `${val}`
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row) => row.price,
    format: (val) => `${val}`
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row) => row.date,
    format: (val) => `${val}`
  }
]

export default {
  name: 'TransactionsTable',
  props: {
    row: Array
  },
  setup () {
    return {
      columns
    }
  }
}
</script>
