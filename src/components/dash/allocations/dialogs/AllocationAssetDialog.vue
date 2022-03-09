<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-input
        autofocus
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
  name: 'AllocationAssetDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  props: {
    editing: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object,
      required: false
    },
    parentNodeId: {
      type: Number,
      required: false
    }
  },
  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const ticker = ref('')
    const exchange = ref('')
    const ratio = ref(1)

    console.dir(props)

    // Let's predefine if it's editing.
    if (props.editing) {
      ticker.value = props.node.asset.ticker
      exchange.value = props.node.asset.exchange
      ratio.value = props.node.category_ratio / 100
    }

    const saveAllocation = async () => {
      try {
        const payload = {
          type: 1,
          title: `${ticker.value}.${exchange.value}`,
          portfolio_id: 1, // It should be defined from $store.
          category_ratio: parseInt(ratio.value) * 100,
          parent_id: props.editing ? props.node.parent_id : props.parentNodeId,
          ticker: ticker.value,
          exchange: exchange.value
        }

        if (props.editing) {
          const { data } = await $api.patch(`/allocations/${props.node.id}`, payload)
          $store.commit('allocation/UPDATE_ALLOCATION', data)
        } else {
          const { data } = await $api.post('/allocations/', payload)
          $store.commit('allocation/ADD_ALLOCATION', data)
        }
      } catch (e) {
        console.error(e)
      }
    }

    const onOKClick = () => {
      saveAllocation()
      onDialogOK()
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
