<template>
  <q-scroll-area style="height: 90vh">
    <q-table
      flat
      bordered
      separator="horizontal"
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="assets"
      :pagination="pagination"
      :filter-method="filterSoldMethod"
    />
  </q-scroll-area>
</template>

<script>
import { ref } from 'vue'

const pagination = {
  sortBy: 'amount',
  descending: true
}

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

const filterSoldMethod = (rows, terms, cols, getCellValue) => {
  console.dir(rows)
  console.dir(terms)
  console.dir(cols)
  console.dir(getCellValue)

  return rows
}

export default {
  name: 'AssetsTable',
  props: {
    assets: Array
  },
  setup () {
    return {
      columns,
      pagination,
      filterSoldMethod
    }
  }
}
</script>
