<template>
  <q-table
    v-model:selected="selectedTableRows"
    flat
    bordered
    separator="horizontal"
    :rows-per-page-options="[0]"
    :selection="selection"
    :columns="columns"
    :rows="currentAllocations"
  >
    <template  #body-cell-title="props">
      <q-td key="title" :props="props">
        <div class="row items-center">
          <div class="col-auto">
            <q-icon
              v-if="props.row.type !== allocationType.CATEGORY"
              :name="icons[props.row.type]"
              size="sm"
              class="q-mr-md"
            />
            <q-btn
              v-else
              flat
              dense
              :icon="icons[props.row.type]"
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
              square
              auto-save
            >
              <q-input
                :model-value="props.value"
                @update:model-value="patchAllocationCategoryTitle(props.row.id, $event)"
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
          square
          auto-save
        >
          <q-input
            :model-value="props.value"
            @update:model-value="patchAllocationCategoryRatio(props.row.id, $event)"
            dense
            autofocus
            counter
            suffix="%"
          />
        </q-popup-edit>
      </q-td>
    </template>
    <template v-if="isEditing" #top-right>
      <q-btn-group
        outline>
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
    <template v-if="isEditing && !isCurrentAllocationConsistent" #bottom>
      <q-icon
        name="warning_amber"
        size="sm"
        class="q-mr-md"
      />
      The total amount of ratio should be exactly 100%
      &nbsp;&nbsp;
      <q-badge
        outline
        color="warning"
        class="q-pa-sm"
        :label="`${currentAllocationRatio}%`" />
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

const icons = {
  1: 'description',
  2: 'folder',
  3: 'payment'
}

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
  }
]

export default defineComponent({
  name: 'AllocationTable',
  emits: [
    'completed',
    'selected'
  ],
  props: {
    currentNodeId: Number,
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
      return $store.getters['allocation/ALLOCATIONS_BY_PARENT'](props.currentNodeId)
    })

    const currentAllocationRatio = computed(() => {
      // If current allocation is an empty Array - let's return false
      if (currentAllocations.value.length === 0) {
        return false
      }

      const categoryRatioList = currentAllocations.value.map(obj => obj.category_ratio)

      return (categoryRatioList.reduce((pool, cur) => pool + cur) / 100)
    })

    const isCurrentAllocationConsistent = computed(() => {
      return currentAllocationRatio.value === 100
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

    const patchAllocation = async (id, payload) => {
      try {
        const { data } = await $api.patch(
          `/allocations/${id}`,
          payload
        )

        $store.commit('allocation/UPDATE_ALLOCATION', data)
      } catch (e) {
        console.error(e)
      }
    }

    const patchAllocationCategoryTitle = async (id, title) => {
      await patchAllocation(id, { title })
    }

    const patchAllocationCategoryRatio = async (id, category_ratio) => {
      await patchAllocation(id, { category_ratio : category_ratio * 100 })
    }

    const completeEditing = () => {
      selectedTableRows.value = []
      emit('completed')
    }

    return {
      icons,
      columns,
      selection,
      areSelected,
      currentAllocations,
      currentAllocationRatio,
      isCurrentAllocationConsistent,
      selectedTableRows,
      allocationType,
      completeEditing,
      emitRowSelection,
      removeAllocations,
      patchAllocationCategoryTitle,
      patchAllocationCategoryRatio
    }
  }
})
</script>


