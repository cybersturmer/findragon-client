<template>
  <q-page padding>
    <div class="column items-end q-pb-md">
      <div class="col">
        <q-btn-group outline>
        <q-btn
          flat
          label="Add transaction"
          @click="openAddTransactionDialog"
        />
        <q-btn
          flat
          label="Edit"
        />
        </q-btn-group>
      </div>
    </div>
    <div v-if="isTransactionsDataAvailable"
         class="column">
      <div class="col">
        <transactions-table :row="transactions" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta, useQuasar } from 'quasar'
import { getCurrentInstance, onMounted, ref, computed } from 'vue'

import TransactionsTable from 'components/dash/transactions/TransactionsTable.vue'
import TransactionAddDialog from 'components/dash/transactions/dialogs/TransactionAddDialog.vue'

const metaData = {
  title: 'Transactions'
}

export default {
  name: 'Transactions',
  components: {
    TransactionsTable,
    TransactionAddDialog
  },
  setup () {
    useMeta(metaData)

    const $vieInstance = getCurrentInstance()
    const $q = useQuasar()

    const { $api, $store } = $vieInstance.appContext.config.globalProperties
    const transactions = computed(() => {
      return $store.getters['transaction/TRANSACTIONS']
    })

    onMounted(async () => {
      try {
        const { data } = await $api.get('/transactions/')
        $store.commit('transaction/SET_TRANSACTIONS', data)
      } catch (e) {
        console.error(e)
      }
    })

    const isTransactionsDataAvailable = computed(() => {
      return Array.isArray(transactions.value) && transactions.value.length > 0
    })

    const openAddTransactionDialog = () => {
      $q.dialog({
        component: TransactionAddDialog,
        componentProps: {
        },
        parent: this,
        cancel: true,
        persistent: true
      })
      .onOk(() => {
        console.log('OK')
      })
    }

    return {
      transactions,
      isTransactionsDataAvailable,
      openAddTransactionDialog
    }
  }
}
</script>
