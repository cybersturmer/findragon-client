<template>
  <q-table
    v-model:selected="selectedTableRows"
    flat
    bordered
    separator="cell"
    :rows-per-page-options="[0]"
    :selection="selection"
    :columns="columns"
    :rows="row"
  >
    <template v-if="isEditing" #body-cell-title="props">
        <q-td key="title" :props="props">
          {{ props.value }}
          <q-popup-edit v-model="props.value" v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter />
          </q-popup-edit>
        </q-td>
    </template>
    <template v-if="isEditing" #body-cell-ratio="props">
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
          color="negative"
          label="Remove"
          :disable="!areSelected"
          @click="removeAllocations"
        />
        <q-btn
          color="primary"
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
    name: 'ratio',
    required: true,
    label: 'Ratio %',
    align: 'center',
    field: (row) => row.category_ratio / 100,
    format: (val) => `${val}`,
    sortable: true
  }
]

export default defineComponent({
  name: 'AllocationTable',
  emits: [
    'completed'
  ],
  props: {
    row: Array,
    isEditing: Boolean
  },
  setup (props, { emit }) {
    const selection = computed(() => {
      return props.isEditing ? 'multiple' : 'none'
    })

    const selectedTableRows = ref([])

    const areSelected = computed(() => {
      return Array.isArray(selectedTableRows.value) && selectedTableRows.value.length > 0
    })

    const $vueInstance = getCurrentInstance()
    const { $api } = $vueInstance.appContext.config.globalProperties

    const removeAllocation = async (id) => {
      try {
        await $api.delete(`/allocations/${id}`)
      } catch (e) {
        console.error(e)
      }
    }

    const removeAllocations = async () => {
      for (const el of selectedTableRows.value) {
        console.log(el)
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
      selectedTableRows,
      completeEditing,
      removeAllocations
    }
  }
})
</script>


