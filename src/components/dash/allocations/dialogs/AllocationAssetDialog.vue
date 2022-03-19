<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-input
        :disable="isEditing"
        :autofocus="!isEditing"
        v-model="ticker"
        label="Ticker"
        type="text"
      />
      <q-input
        :disable="isEditing"
        v-model="exchange"
        label="Exchange"
        type="text"
      />
      <q-input
        v-model="ratio"
        :autofocus="isEditing"
        label="Ratio"
        type="number"
        @keydown.enter.prevent="onOKClick"
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
import { computed, getCurrentInstance, ref } from 'vue'

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

    const isEditing = computed(() => {
      return props.editing
    })

    const ticker = ref('')
    const exchange = ref('')
    const ratio = ref(1)

    // Let's predefine if it's editing.
    if (props.editing) {
      ticker.value = props.node.asset.ticker
      exchange.value = props.node.asset.exchange
      ratio.value = props.node.category_ratio / 100
    }

    const saveAllocation = async () => {
      try {
        const payload = {
          type: 1,  // Hardcoded because menu point mean we create Asset
          title: `${ticker.value}.${exchange.value}`,
          portfolio_id: 1, // It should be defined from $store.
          category_ratio: parseInt(ratio.value) * 100,
          parent_id: props.editing ? props.node.parent_id : props.parentNodeId
        }

        if (props.editing) {
          const { data } = await $api.patch(`/allocations/${props.node.id}`, payload)
          $store.commit('allocation/UPDATE_ALLOCATION', data)
        } else {

          payload.ticker = ticker.value
          payload.exchange = exchange.value

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
      isEditing,
      onDialogHide,
      onOKClick
    }
  }
}
</script>
