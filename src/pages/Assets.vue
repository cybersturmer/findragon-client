<template>
  <q-page padding>
    <div v-if="isAssetsDataAvailable"
         class="column">
      <div class="col">
        <assets-table
          :assets="assets"
        />
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

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const assets = computed(() => $store.getters['asset/ASSETS'])

    onMounted(async () => {
      try {
        const { data } = await $api.get('/assets/')

        $store.commit('asset/SET_ASSETS', data)
      } catch (e) {
        console.error(e)
      }
    })

    const isDataAvailable = computed(() => {
      return Array.isArray(assets.value) && assets.value.length > 0
    })

    return {
      assets,
      isDataAvailable
    }
  }
}
</script>
