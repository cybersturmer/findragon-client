<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <allocation-chart
          :row="row"
        />
      </div>
      <div class="col">
        <allocation-table
          :row="row"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AllocationTable from 'components/dash/allocation/AllocationTable.vue'
import AllocationChart from 'components/dash/allocation/AllocationChart.vue'

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
    AllocationChart,
    AllocationTable
  },
  setup () {
    return {
      row
    }
  }
})
</script>
