<template>
  <q-page padding>
    <div v-if="isAssetsDataAvailable"
         class="column">
      <div class="col">
        <assets-table :row="assets" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar'
import { getCurrentInstance, onMounted, computed, ref } from 'vue'

import AssetsTable from 'components/dash/assets/AssetsTable.vue'

const metaData = {
  title: 'Assets'
}

export default {
  name: 'Assets',
  components: { AssetsTable },
  setup () {
    useMeta(metaData)

    const assets = ref(null)
    const $vueInstance = getCurrentInstance()

    const { $api } = $vueInstance.appContext.config.globalProperties

    onMounted(async () => {
      try {
        const response = await $api.get('/assets/')

        assets.value = response.data
      } catch (e) {
        console.error(e)
      }
    })

    const isAssetsDataAvailable = computed(() => {
      return Array.isArray(assets.value) && assets.value.length > 0
    })

    return {
      assets,
      isAssetsDataAvailable
    }
  }
}
</script>
