<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-input
        v-model="ticker"
        label="Ticker"
        type="text"
      />
      <q-input
        v-model="exchange"
        label="Exchange"
        type="text"
      />
      <q-input
        v-model="ratio"
        label="Ratio"
        type="number"
      />
      <q-card-actions vertical>
        <q-btn
          flat
          label="Save"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { getCurrentInstance, ref } from 'vue'

export default {
  name: 'AllocationAssetAddDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  props: {
    parentNodeId: Number
  },
  setup (props) {
    const { dialogRef, onDialogHide, onDialogOk, onDialogCancel } = useDialogPluginComponent()

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const ticker = ref('')
    const exchange = ref('')
    const ratio = ref(1)

    const saveAllocation = async () => {
      try {
        const payload = {
          type: 1,
          title: `${ticker}.${exchange}`,
          portfolio_id: 1, // It should be defined from $store.
          category_ratio: parseInt(ratio.value) * 100,
          parent_id: props.parentNodeId,
          ticker,
          exchange
        }

        const { data } = await $api.post('/allocations/', payload)
        $store.commit('allocation/ADD_ALLOCATION', data)
      } catch (e) {
        console.error(e)
      }
    }

    const onOKClick = () => {
      saveAllocation()
      onDialogOk()
    }

    return {
      ticker,
      exchange,
      ratio,
      dialogRef,
      onDialogHide,
      onOKClick
    }
  }
}
</script>
