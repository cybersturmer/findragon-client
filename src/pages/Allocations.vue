<template>
  <q-page padding>
    <div>
      <div class="column items-end q-pb-md">
        <div class="col">
          <q-btn-group>
            <q-btn
              dense
              label="Upper"
              v-show="nodeDefined"
              icon="keyboard_arrow_up"
              class="q-mr-xs q-pr-md"
              @click="selectParentNode"
            />
            <q-btn-dropdown
              v-show="isEditing"
              label="Add allocation"
            >
              <q-list separator bordered >
                <q-item clickable v-ripple v-close-popup @click="openAllocationAssetAddDialog">
                  <q-item-section avatar>
                    <q-icon
                      name="feed"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      ASSET
                    </q-item-label>
                    <q-item-label caption>
                      Exchange based asset
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple v-close-popup @click="openAllocationCategoryAddDialog">
                  <q-item-section avatar>
                    <q-icon
                      name="folder"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      CATEGORY
                    </q-item-label>
                    <q-item-label caption>
                      Category for assets
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn
              v-if="!isEditing"
              flat
              label="Edit"
              @click="changeEditingMode"
            />
          </q-btn-group>
        </div>
      </div>
      <div
        v-if="isAllocationDataAvailable"
        class="row">
        <div v-show="!isEditing" class="col-4">
            <allocation-chart
              :current-node="currentNodeId"
              :row="allocations"
              @selected="selectNode($event)"
            />
        </div>
        <div class="col">
          <allocation-table
            :current-node-id="currentNodeId"
            :is-editing="isEditing"
            @selected="selectNode($event)"
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

    // Current active parent element. Null if the root element.
    const currentNodeId = ref(null)
    const parentNodeId = ref(null)

    const selectNode = (id) => {
      parentNodeId.value = currentNodeId.value
      currentNodeId.value = id
    }

    const selectParentNode = () => {
      currentNodeId.value = parentNodeId.value
      if (parentNodeId.value) {
        const node = $store.getters['allocation/ALLOCATION_BY_ID'](parentNodeId.value)
        parentNodeId.value = node.parent_id
      }
    }

    const nodeDefined = computed(() => currentNodeId.value !== null)

    const isEditing = ref(false)
    const flexButtonTitle = computed(() => { return isEditing.value ? 'Complete' : 'Edit' })

    const allocations = computed(() => $store.getters['allocation/ALLOCATIONS'])

    const $q = useQuasar()

    const openAllocationAssetAddDialog = () => {
      $q.dialog({
        component: AllocationAssetAddDialog,
        componentProps: {
          parentNodeId: currentNodeId.value
        },
        parent: this,
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
        componentProps: {
          parentNodeId: currentNodeId.value
        },
        parent: this,
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
      currentNodeId,
      parentNodeId,
      nodeDefined,
      selectNode,
      selectParentNode,
      flexButtonTitle,
      isAllocationDataAvailable,
      changeEditingMode,
      openAllocationAssetAddDialog,
      openAllocationCategoryAddDialog
    }
  }
})
</script>
