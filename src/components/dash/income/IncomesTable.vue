<template>
  <div>My component</div>
</template>

<script>
import {
  ref,
  computed,
  getCurrentInstance
} from 'vue'

export default {
  name: 'IncomesTable',
  props: {
    incomes: Array,
    isEditing: Boolean
  },
  setup (props, { emit }) {
    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const selection = computed(() => {
      return props.isEditing ? 'multiple' : 'none'
    })

    const selectedTableRows = ref([])
    const areSelected = computed(() => {
      return Array.isArray(selectedTableRows.value) && selectedTableRows.value.length > 0
    })

    return {

    }
  }
}
</script>
