<template>
  <q-table
    title="Allocation table"
    :columns="columns"
    :rows="row"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import { Allocation } from 'components/models'

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row: { title: string }) => row.title,
    format: (val: string) => `${val}`,
    sortable: true
  },
  {
    name: 'portfolio_ratio',
    required: true,
    label: 'Ratio',
    align: 'center',
    field: (row : { portfolio_ratio: number }) => row.portfolio_ratio,
    format: (val: string) => `${val}`,
    sortable: true
  }
]

export default defineComponent({
  name: 'AllocationTable',
  props: {
    row: Array as PropType<Allocation[]>
  },
  setup () {
    return {
      columns
    }
  }
})
</script>


