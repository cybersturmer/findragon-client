<template>
  <q-table
    :columns="columns"
    :rows="row"
  />
</template>

<script>

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row) => row.description,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'ticker',
    required: true,
    label: 'Ticker',
    align: 'center',
    field: (row) => row.ticker,
    format: (val) => `${val}`
  }
]

export default {
  name: 'AssetsTable',
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
