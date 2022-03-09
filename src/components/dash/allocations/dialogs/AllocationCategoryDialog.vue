<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-input
        autofocus
        v-model="title"
        label="Category name"
        type="text"
      />
      <q-input
        v-model="ratio"
        label="Ratio %"
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
import { ref, getCurrentInstance } from 'vue'


export default {
  name: 'AllocationCategoryDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  props: {
    editing: {
      type: Boolean,
      required: true
    },
    node:  {
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

    const title = ref('')
    const ratio = ref(1)

    // If we do not intent to create and just editing.
    if (props.editing) {
      title.value = props.node.title
      ratio.value = props.node.category_ratio / 100
    }


    const saveAllocation = async () => {
      try {

        const payload = {
          type: 2,
          title: title.value,
          portfolio_id: 1, // We have to define portfolio id
          category_ratio: parseInt(ratio.value) * 100,
          parent_id: props.editing ? props.node.parent_id : props.parentNodeId,
          ticker: null,
          exchange: null
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
      title,
      ratio,
      dialogRef,
      onDialogHide,
      onOKClick
    }
  }
}
</script>
