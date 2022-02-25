<template>
  <q-table
    title="Allocation table"
    :columns="columns"
    :rows="row"
  />
</template>

<script>
import { defineComponent } from 'vue'

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'portfolio_ratio',
    required: true,
    label: 'Ratio',
    align: 'center',
    field: (row) => row.portfolio_ratio,
    format: (val) => `${val}`,
    sortable: true
  }
]

export default defineComponent({
  name: 'AllocationTable',
  props: {
    row: Array
  },
  setup () {
    return {
      columns
    }
  }
})
</script>


