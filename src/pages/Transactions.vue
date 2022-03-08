<template>
  <q-page padding>
    <div class="column items-end q-pb-md">
      <div class="col">
        <q-btn
          flat
          label="Add transaction"
        />
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
import { useMeta } from 'quasar'
import { getCurrentInstance, onMounted, ref, computed } from 'vue'

import TransactionsTable from "components/dash/transactions/TransactionsTable.vue"

const metaData = {
  title: 'Transactions'
}

export default {
  name: 'Transactions',
  components: { TransactionsTable },
  setup () {
    useMeta(metaData)

    const transactions = ref(null)
    const $vieInstance = getCurrentInstance()

    const { $api } = $vieInstance.appContext.config.globalProperties

    onMounted(async () => {
      try {
        const response = await $api.get('/transactions/')

        transactions.value = response.data
      } catch (e) {
        console.error(e)
      }
    })

    const isTransactionsDataAvailable = computed(() => {
      return Array.isArray(transactions.value) && transactions.value.length > 0
    })

    return {
      transactions,
      isTransactionsDataAvailable
    }
  }
}
</script>
