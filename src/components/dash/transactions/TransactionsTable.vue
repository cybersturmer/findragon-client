<template>
  <q-table
    flat
    bordered
    separator="horizontal"
    :rows-per-page-options="[0]"
    :pagination="pagination"
    :columns="columns"
    :rows="row">
    <template #body-cell-type="props">
      <q-td key="type" :props="props">
        <q-icon
          :name="transactionTypeIconsMapping[props.row.type].icon"
          :color="transactionTypeIconsMapping[props.row.type].color"
          size="md"
        />
        {{ props.value }}
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { date as quasarDate } from 'quasar'

const transactionTypesMapping = {
  1: 'Buy',
  2: 'Sell'
}

const transactionTypeIconsMapping = {
  1: {
    icon: 'arrow_drop_up',
    color: 'positive'
  },
  2: {
    icon: 'arrow_drop_down',
    color: 'negative'
  }
}

const pagination = {
  sortBy: 'date',
  descending: true
}

const columns = [
  {
    name: 'type',
    required: true,
    label: 'Operation',
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
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: (row) => row.amount,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row) => row.price,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row) => quasarDate.formatDate(row.date, 'DD.MM.YYYY'),
    format: (val) => `${val}`,
    sortable: true
  }
]

export default {
  name: 'TransactionsTable',
  props: {
    row: Array
  },
  setup () {
    return {
      columns,
      pagination,
      transactionTypeIconsMapping
    }
  }
}
</script>
