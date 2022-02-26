<template>
  <q-page padding>
    <div v-if="isTransactionsDataAvailable"
         class="row">
      <div class="col">
        <transactions-table :row="transactions" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { getCurrentInstance, onMounted, ref, computed } from 'vue'
import TransactionsTable from "components/dash/transactions/TransactionsTable.vue"

export default {
  name: 'Transactions',
  components: { TransactionsTable },
  setup () {
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
