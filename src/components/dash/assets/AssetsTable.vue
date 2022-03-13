<template>
  <q-scroll-area style="height: 90vh">
    <q-table
      flat
      bordered
      separator="horizontal"
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="row"
    />
  </q-scroll-area>
</template>

<script>

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row) => row.asset.description,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'ticker',
    required: true,
    label: 'Ticker',
    align: 'center',
    field: (row) => row.asset.ticker,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'center',
    field: (row) => row.amount,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'total_price',
    required: true,
    label: 'Total price',
    align: 'center',
    field: (row) => row.total_price,
    format: (val) => `${ val ? val : '-' }`,
    sortable: true
  },
  {
    name: 'avg_price',
    required: true,
    label: 'Average price',
    align: 'center',
    field: (row) => row.avg_price,
    format: (val) => `${ val ? val : '-' }`,
    sortable: true
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
