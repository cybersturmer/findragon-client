<template>
  <q-page padding>
    <div>
      <div class="column items-end q-pb-md">
        <div class="col">
          <q-btn-group>
            <q-btn
              dense
              label="Back"
              v-show="nodeDefined"
              icon="arrow_left"
              class="q-mr-xs q-pr-md"
              @click="selectParentNode"
            />
            <q-btn-dropdown
              v-show="isEditing"
              label="Add allocation"
            >
              <q-list separator bordered >
                <q-item clickable v-ripple v-close-popup @click="openAddAllocationAssetDialog">
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
                <q-item clickable v-ripple v-close-popup @click="openAddAllocationCategoryDialog">
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
      <div class="row">
        <div v-show="!isEditing" class="col-auto q-px-md">
            <allocation-chart
              :current-node="currentNodeId"
              :row="allocations"
              @selected="selectNode($event)"
            />
        </div>
        <div class="col">
          <allocations-table
            :current-node-id="currentNodeId"
            :is-editing="isEditing"
            @edit="editAllocation($event)"
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

import { allocationTypesEnum } from 'src/services/enums'

import AllocationsTable from 'components/dash/allocations/AllocationsTable.vue'
import AllocationChart from 'components/dash/allocations/AllocationChart.vue'
import AllocationAssetDialog from 'components/dash/allocations/dialogs/AllocationAssetDialog.vue'
import AllocationCategoryDialog from 'components/dash/allocations/dialogs/AllocationCategoryDialog.vue'


const metaData = {
  title: 'Allocation'
}

export default defineComponent({
  name: 'Allocations',
  components: {
    AllocationChart,
    AllocationsTable
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

    const changeEditingMode = () => {
      isEditing.value = !isEditing.value
    }

    const openAddAllocationCategoryDialog = () => {
      $q.dialog({
        component: AllocationCategoryDialog,
        componentProps: {
          editing: false,
          node: null,
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

    const openEditAllocationCategoryDialog = (node) => {
      $q.dialog({
        component: AllocationCategoryDialog,
        componentProps: {
          editing: true,
          node: node,
          parentNodeId: null
        },
        parent: this,
        cancel: true,
        persistent: true
      })
      .onOk(() => {
        console.log('OK')
      })
    }

    const openAddAllocationAssetDialog = () => {
      $q.dialog({
        component: AllocationAssetDialog,
        componentProps: {
          editing: false,
          node: null,
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

    const openEditAllocationAssetDialog = (node) => {
      $q.dialog({
        component: AllocationAssetDialog,
        componentProps: {
          editing: true,
          node: node,
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

    const editAllocation = (node) => {
      switch (node.type) {
        case allocationTypesEnum.CATEGORY:
          return openEditAllocationCategoryDialog(node)
        case allocationTypesEnum.ASSET:
          return openEditAllocationAssetDialog(node)
      }
    }

    onMounted(async () => {
      try {
        const { data } = await $api.get('/allocations/')

        $store.commit('allocation/SET_ALLOCATIONS', data)
      } catch (e) {
        console.error(e)
      }
    })

    const isDataAvailable = computed(() => {
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
      isDataAvailable,
      editAllocation,
      changeEditingMode,
      openAddAllocationCategoryDialog,
      openEditAllocationCategoryDialog,
      openAddAllocationAssetDialog,
      openEditAllocationAssetDialog
    }
  }
})
</script>
