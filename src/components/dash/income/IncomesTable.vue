<template>
  <q-table
  flat
  bordered
  separator="horizontal"
  :rows-per-page-options="[0]"
  v-model:selected="selectedTableRows"
  :selection="selection"
  :columns="columns"
  :rows="incomes"
  :pagination="pagination"
  >
    <template #body-cell-operation="props">
      <q-td key="type" :props="props" class="text-bold text-positive">
        <q-icon
          name="paid"
          size="xs"
          class="q-mr-sm"
        />
        {{ props.value }}
      </q-td>
    </template>
    <template v-if="isEditing" #top-right="props">
      <q-btn-group outline>
        <q-btn
          outline
          label="Remove"
          :disable="!areSelected"
          @click="removeIncomes"
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
  getCurrentInstance
} from 'vue'

import { date as quasarDate } from 'quasar'
import { incomesOptions } from 'src/services/enums'

const columns = [
  {
    name: 'operation',
    required: true,
    label: 'Operation',
    align: 'left',
    field: (row) => row.operation,
    format: (val) => incomesOptions.find(el => el.value === val).label,
    sortable: true
  },
  {
    name: 'asset',
    required: true,
    label: 'Asset',
    align: 'left',
    field: (row) => row.asset.description ?
      row.asset.description :
      `${row.asset.ticker}.${row.asset.exchange}`,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: (row) => row.amount,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row) => row.price,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'tax',
    required: true,
    label: 'Tax',
    align: 'left',
    field: (row) => row.tax,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row) => quasarDate.formatDate(row.date, 'DD.MM.YYYY'),
    format: (val) => `${val}`,
    sortable: true
  }
]

const pagination = {
  sortBy: 'date',
  descending: true
}

export default {
  name: 'IncomesTable',
  props: {
    incomes: Array,
    isEditing: Boolean
  },
  setup (props, { emit }) {
    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const selection = computed(() => {
      return props.isEditing ? 'multiple' : 'none'
    })

    const selectedTableRows = ref([])
    const areSelected = computed(() => {
      return Array.isArray(selectedTableRows.value) && selectedTableRows.value.length > 0
    })

    const removeIncome = async (id) => {
      try {
        await $api.delete(`/incomes/${id}`)
      } catch (e) {
        console.error(e)
      }
    }

    const removeIncomes = async (id) => {
      try {
        for (const el of selectedTableRows.value) {
          await removeIncome(el.id)
        }

        $store.commit('income/REMOVE_INCOMES', selectedTableRows.value)
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
      pagination,
      selection,
      areSelected,
      incomesOptions,
      completeEditing,
      removeIncomes,
      selectedTableRows
    }
  }
}
</script>
