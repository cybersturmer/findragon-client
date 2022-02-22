<template>
  <q-page padding>
    <allocation-table
      :row="row"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AllocationTable from 'components/dash/allocation/AllocationTable.vue'

const row = [
  {
    title: 'Indexed',
    portfolio_ratio: 80
  },
  {
    title: 'Bonds',
    portfolio_ratio: 10
  },
  {
    title: 'Shares',
    portfolio_ratio: 10
  }
]

export default defineComponent({
  name: 'Allocations',
  components: {
    AllocationTable
  },
  setup () {
    return {
      row
    }
  }
})
</script>
