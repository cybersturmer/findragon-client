<template>
  <q-page padding>
    <div>
      <div class="column items-end q-pb-md">
        <div class="col">
          <q-btn-dropdown
            v-show="isEditing"
            label="Add allocation"
            outline>
            <q-list>
              <q-item clickable v-close-popup @click="openAllocationAssetAddDialog">
                <q-item-section>
                  <q-item-label>
                    Asset
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="openAllocationCategoryAddDialog">
                <q-item-section>
                  <q-item-label>
                    Category
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            v-if="!isEditing"
            outline
            label="Edit"
            @click="changeEditingMode"
          />
        </div>
      </div>
      <div v-if="isAllocationDataAvailable"
           class="row">
        <div v-show="!isEditing" class="col-6">
            <allocation-chart :row="allocations" />
        </div>
        <div class="col">
          <allocation-table
            :row="allocations"
            :is-editing="isEditing"
            @completed="isEditing = !isEditing"
          />
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
import AllocationCategoryAddDialog from 'components/dash/allocations/dialogs/AllocationCategoryAddDialog.vue'


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

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const isEditing = ref(false)
    const flexButtonTitle = computed(() => { return isEditing.value ? 'Complete' : 'Edit' })

    const allocations = computed(() => $store.getters['allocation/ALLOCATIONS'])

    const $q = useQuasar()

    const openAllocationAssetAddDialog = () => {
      $q.dialog({
        component: AllocationAssetAddDialog,
        cancel: true,
        persistent: true
      })
      .onOk(() => {
        console.log('OK')
      })
    }

    const changeEditingMode = () => {
      isEditing.value = !isEditing.value
    }

    const openAllocationCategoryAddDialog = () => {
      $q.dialog({
        component: AllocationCategoryAddDialog,
        cancel: true,
        persistent: true
      })
      .onOk(() => {
        console.log('OK')
      })
    }

    onMounted(async () => {
      try {
        const { data } = await $api.get('/allocations/')

        $store.commit('allocation/SET_ALLOCATIONS', data)
      } catch (e) {
        console.error(e)
      }
    })

    const isAllocationDataAvailable = computed(() => {
      return allocations.value.length > 0
    })

    return {
      isEditing,
      allocations,
      flexButtonTitle,
      isAllocationDataAvailable,
      changeEditingMode,
      openAllocationAssetAddDialog,
      openAllocationCategoryAddDialog
    }
  }
})
</script>
