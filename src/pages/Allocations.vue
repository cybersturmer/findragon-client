<template>
  <q-page padding>
    <div class="column items-end q-pb-md">
      <div class="col">
        <q-btn
          flat
          color="primary"
          label="Add allocation"
          icon="description"
        />
      </div>
    </div>
    <div class="column">
      <div v-if="isAllocationDataAvailable"
      class="row">
        <div class="col-auto">
          <allocation-chart :row="allocations" />
        </div>
        <div class="col">
          <allocation-table :row="allocations" />
        </div>
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

import { useMeta } from 'quasar'

import AllocationTable from 'components/dash/allocations/AllocationTable.vue'
import AllocationChart from 'components/dash/allocations/AllocationChart.vue'

const metaData = {
  title: 'Allocation'
}

export default defineComponent({
  name: 'Allocations',
  components: {
    AllocationChart,
    AllocationTable
  },
  setup () {
    useMeta(metaData)

    const allocations = ref(null)
    const $vueInstance = getCurrentInstance()

    const { $api } = $vueInstance.appContext.config.globalProperties

    onMounted(async () => {
      try {
        const response = await $api.get('/allocations/')

        allocations.value = response.data
      } catch (e) {
        console.error(e)
      }
    })

    const isAllocationDataAvailable = computed(() => {
      return Array.isArray(allocations.value) && allocations.value.length > 0
    })

    return {
      allocations,
      isAllocationDataAvailable
    }
  }
})
</script>
