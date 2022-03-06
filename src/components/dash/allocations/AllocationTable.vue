<template>
  <q-table
    v-model:selected="selectedTableRows"
    dark
    flat
    bordered
    separator="vertical"
    :hide-bottom="!isEditing"
    :rows-per-page-options="[0]"
    :selection="selection"
    :columns="columns"
    :rows="currentAllocations"
  >
    <template  #body-cell-title="props">
      <q-td key="title" :props="props">
        <div class="row items-center">
          <div class="col-auto">
            <q-btn
              v-if="props.row.type === allocationType.CATEGORY"
              flat
              dense
              icon="folder"
              size="md"
              class="q-mr-md"
              @click="emitRowSelection(props.row.id)"
            />
          </div>
          <div class="col">
            {{ props.value }}
            <q-popup-edit
              v-if="isEditing"
              v-model="props.value"
              v-slot="scope"
              title="Title"
              label-set="save"
              square
              buttons
              auto-save
            >
              <q-input
                v-model="scope.value"
                color="dark"
                dense
                autofocus
                counter
              />
            </q-popup-edit>
          </div>
        </div>
      </q-td>
    </template>
    <template v-if="isEditing" #body-cell-category_ratio="props">
      <q-td key="ratio" :props="props">
        {{ props.value }}
        <q-popup-edit
          v-model="props.value"
          v-slot="scope"
          :title="`${props.row.title} ratio`"
          label-set="save"
          square
          buttons
          auto-save
        >
          <q-input
            v-model="scope.value"
            color="dark"
            dense
            autofocus
            counter
            suffix="%"
          />
        </q-popup-edit>
      </q-td>
    </template>
    <template v-if="isEditing" #bottom>
      <q-btn-group outline class="q-ma-sm float-right">
        <q-btn
          outline
          label="Remove"
          :disable="!areSelected"
          @click="removeAllocations"
        />
        <q-btn
          outline
          label="Complete"
          @click="completeEditing"
        />
      </q-btn-group>
    </template>
  </q-table>
</template>

<script>
import {
  ref,
  computed,
  defineComponent,
  getCurrentInstance
} from 'vue'

import { allocationType } from 'src/store/allocation/presets'

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'category_ratio',
    required: true,
    label: 'Category Ratio %',
    align: 'center',
    field: (row) => row.category_ratio / 100,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'portfolio_ratio',
    required: true,
    label: 'Portfolio Ratio %',
    align: 'center',
    field: (row) => row.portfolio_ratio / 100,
    format: (val) => `${val}`,
    sortable: true
  }
]

export default defineComponent({
  name: 'AllocationTable',
  emits: [
    'completed',
    'selected'
  ],
  props: {
    currentNode: Number,
    isEditing: Boolean
  },
  setup (props, { emit }) {

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    // Can we select one or none row in the table.
    const selection = computed(() => {
      return props.isEditing ? 'multiple' : 'none'
    })

    const currentAllocations = computed(() => {
      return $store.getters['allocation/ALLOCATIONS_BY_PARENT'](props.currentNode)
    })

    const selectedTableRows = ref([])
    const areSelected = computed(() => {
      return Array.isArray(selectedTableRows.value) && selectedTableRows.value.length > 0
    })

    const emitRowSelection = (id) => {
      emit('selected', id)
    }

    const removeAllocation = async (id) => {
      try {
        await $api.delete(`/allocations/${id}`)
      } catch (e) {
        console.error(e)
      }
    }

    const removeAllocations = async () => {
      try {
        for (const el of selectedTableRows.value) {
          await removeAllocation(el.id)
        }

        $store.commit('allocation/REMOVE_ALLOCATIONS', selectedTableRows.value)
        selectedTableRows.value = []
      } catch (e) {
        console.error(e)
      }
    }

    const completeEditing = () => {
      selectedTableRows.value = []
      emit('completed')
    }

    return {
      columns,
      selection,
      areSelected,
      currentAllocations,
      selectedTableRows,
      allocationType,
      emitRowSelection,
      completeEditing,
      removeAllocations
    }
  }
})
</script>


