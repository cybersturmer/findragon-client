<template>
  <q-page padding>
    <div>
      <div class="column items-end q-pb-md">
        <div class="col">
          <q-btn-dropdown
            label="Add allocation"
            flat
          >
            <q-list>
              <q-item clickable v-close-popup @click="openAllocationAddDialog">
                <q-item-section>
                  <q-item-label>
                    Asset
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="openAllocationAddDialog">
                <q-item-section>
                  <q-item-label>
                    Category
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
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

import { useMeta, useQuasar } from 'quasar'

import AllocationTable from 'components/dash/allocations/AllocationTable.vue'
import AllocationChart from 'components/dash/allocations/AllocationChart.vue'
import AllocationAssetAddDialog from 'components/dash/allocations/dialogs/AllocationAssetAddDialog.vue'

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

    const $q = useQuasar()

    const openAllocationAddDialog = () => {
      $q.dialog({
        component: AllocationAssetAddDialog,
      })
      .onOk(() => {
        console.log('OK')
      })
    }

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
      isAllocationDataAvailable,
      openAllocationAddDialog
    }
  }
})
</script>
