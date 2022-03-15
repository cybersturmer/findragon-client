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
  }
}
</script>
