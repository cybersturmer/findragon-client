<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-input
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
  name: 'AllocationCategoryAddDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  props: {
    parentNodeId: Number
  },
  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const title = ref('')
    const ratio = ref(1)

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const saveAllocation = async () => {
      try {

        const payload = {
          type: 2,
          title: title.value,
          portfolio_id: 1,
          category_ratio: parseInt(ratio.value) * 100,
          parent_id: props.parentNodeId,
          ticker: null,
          exchange: null
        }

        const { data } = await $api.post('/allocations/', payload)
        $store.commit('allocation/ADD_ALLOCATION', data)
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
