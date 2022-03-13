<template>
  <q-table
    flat
    bordered
    separator="horizontal"
    :rows-per-page-options="[0]"
    v-model:selected="selectedTableRows"
    :selection="selection"
    :columns="columns"
    :rows="transactions"
    :pagination="pagination"
  >
    <template #body-cell-type="props">
      <q-td key="type" :props="props">
        <q-icon
          :name="transactionTypeIconsMapping[props.row.type].icon"
          :color="transactionTypeIconsMapping[props.row.type].color"
          size="md"
        />
        {{ props.value }}
      </q-td>
    </template>
    <template v-if="isEditing" #top-right>
      <q-btn-group
        outline>
        <q-btn
          outline
          :disable="!areSelected"
          label="Remove"
          @click="removeTransactions"
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
import { date as quasarDate } from 'quasar'
import { ref, computed, getCurrentInstance } from 'vue'

const transactionTypesMapping = {
  1: 'Buy',
  2: 'Sell'
}

const transactionTypeIconsMapping = {
  1: {
    icon: 'arrow_drop_up',
    color: 'positive'
  },
  2: {
    icon: 'arrow_drop_down',
    color: 'negative'
  }
}

const pagination = {
  sortBy: 'date',
  descending: true
}

const columns = [
  {
    name: 'type',
    required: true,
    label: 'Operation',
    align: 'left',
    field: (row) => row.type,
    format: (val) => `${transactionTypesMapping[val]}`,
    sortable: true
  },
  {
    name: 'asset',
    required: true,
    label: 'Asset',
    align: 'left',
    field: (row) => row.asset.description,
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
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row) => quasarDate.formatDate(row.date, 'DD.MM.YYYY'),
    format: (val) => `${val}`,
    sortable: true
  }
]

export default {
  name: 'TransactionsTable',
  props: {
    transactions: Array,
    isEditing: Boolean
  },
  setup (props, { emit }) {
    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    // We can select one or none row in the table
    const selection = computed(() => {
      return props.isEditing ? 'multiple' : 'none'
    })

    const selectedTableRows = ref([])
    const areSelected = computed(() => {
      return Array.isArray(selectedTableRows.value) && selectedTableRows.value.length > 0
    })

    const removeTransaction = async (id) => {
      try {
        await $api.delete(`/transactions/${id}`)
      } catch (e) {
        console.error(e)
      }
    }

    const removeTransactions = async () => {
      try {
        for (const el of selectedTableRows.value) {
          await removeTransaction(el.id)
        }

        $store.commit('transaction/REMOVE_TRANSACTIONS', selectedTableRows.value)
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
      completeEditing,
      removeTransactions,
      selectedTableRows,
      transactionTypeIconsMapping
    }
  }
}
</script>
