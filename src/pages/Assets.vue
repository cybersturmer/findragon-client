<template>
  <q-page padding>
    <div v-if="isAssetsDataAvailable"
         class="row">
      <div class="col">
        <assets-table :row="assets" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { getCurrentInstance, onMounted, computed, ref } from 'vue'
import AssetsTable from 'components/dash/assets/AssetsTable.vue'

export default {
  name: 'Assets',
  components: { AssetsTable },
  setup () {
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
