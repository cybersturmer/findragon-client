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
    format: (val) => `${val}`,
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
