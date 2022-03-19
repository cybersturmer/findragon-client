<template>
  <q-page padding>
    <div class="row">
      <div class="col q-py-sm">
        <q-toggle
          v-model="showSold"
          label="Show Sold Assets"
          keep-color
          color="primary"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <assets-table
          :assets="assets"
          :show-sold="showSold"
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
  components: {
    AssetsTable
  },
  setup () {
    useMeta(metaData)

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const assets = computed(() => $store.getters['asset/ASSETS'])

    const showSold = ref(false)

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
      isDataAvailable,
      showSold
    }
  }
}
</script>
