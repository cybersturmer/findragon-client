<template>
  <q-page padding>

    <div class="column items-end q-pb-md">
      <div class="col">
        <q-btn
          flat
          color="primary"
          label="Add allocation"
          icon="description"
          @click="openAllocationAddDialog"
        />
      </div>
    </div>
    <q-card flat bordered class="column relative-position card-example">
      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="isAllocationDataAvailable"
               class="row">
            <div class="col-auto">
              <allocation-chart :row="allocations" />
            </div>
            <div class="col">
              <allocation-table :row="allocations" />
            </div>
          </div>
        </transition>
      </q-card-section>

      <q-inner-loading :showing="!isAllocationDataAvailable">
        <q-spinner-oval size="100px" color="dark" />
      </q-inner-loading>
    </q-card>
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
