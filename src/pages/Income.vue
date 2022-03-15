<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
import { useMeta, useQuasar } from 'quasar'
import { getCurrentInstance, onMounted, ref, computed } from 'vue'

const metaData = {
  title: 'Income'
}

export default {
  name: 'Income',
  setup () {
    useMeta(metaData)

    const $vueInstance = getCurrentInstance()
    const $q = useQuasar()

    const isEditing = ref(false)

    const { $api, $store } = $vueInstance.appContext.config.globalProperties
    const income = computed(() => $store.getters['income/INCOME'])

    onMounted(async () => {
      try {
        const { data } = await $api.get('/income/')

        $store.commit('income/SET_INCOME', data)
      } catch (e) {
        console.error(e)
      }
    })
  }
}
</script>
