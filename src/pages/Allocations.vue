<template>
  <q-page padding>
    <div v-if="isAllocationDataAvailable"
      class="row">
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
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'

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
      try {
        const response = await $api.get('/allocations/')

        allocation.value = response.data
      } catch (e) {
        console.error(e)
      }
    })

    const isAllocationDataAvailable = computed(() => {
      return Array.isArray(allocation.value) && allocation.value.length > 0
    })

    return {
      allocation,
      isAllocationDataAvailable
    }
  }
})
</script>
