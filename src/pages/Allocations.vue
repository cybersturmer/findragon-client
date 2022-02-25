<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <allocation-chart :row="allocation" />
      </div>
      <div class="col">
        <allocation-table :row="allocation" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'

import AllocationTable from 'components/dash/allocation/AllocationTable.vue'
import AllocationChart from 'components/dash/allocation/AllocationChart.vue'

export default defineComponent({
  name: 'Allocations',
  components: {
    AllocationChart,
    AllocationTable
  },
  setup () {
    const allocation = ref(null)
    const $vueInstance = getCurrentInstance()

    const { $api } = $vueInstance.appContext.config.globalProperties

    onMounted(async () => {
      allocation.value = await $api.get('/allocations/')
    })

    return {
      allocation
    }
  }
})
</script>
