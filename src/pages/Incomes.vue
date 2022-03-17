<template>
  <q-page padding>
    <incomes-table :incomes="incomes" :is-editing="false"/>
  </q-page>
</template>

<script>
import { useMeta, useQuasar } from 'quasar'
import { getCurrentInstance, onMounted, ref, computed } from 'vue'

import IncomesTable from 'components/dash/income/IncomesTable.vue'

const metaData = {
  title: 'Incomes'
}

export default {
  name: 'Incomes',
  components: {
    IncomesTable
  },
  setup () {
    useMeta(metaData)

    const $vueInstance = getCurrentInstance()
    const $q = useQuasar()

    const isEditing = ref(false)

    const { $api, $store } = $vueInstance.appContext.config.globalProperties
    const incomes = computed(() => $store.getters['income/INCOMES'])

    onMounted(async () => {
      try {
        const { data } = await $api.get('/incomes/')

        $store.commit('income/SET_INCOMES', data)
      } catch (e) {
        console.error(e)
      }
    })

    const isDataAvailable = computed(() => {
      return Array.isArray(incomes.value) && incomes.value.length > 0
    })

    return {
      incomes
    }
  }
}
</script>
