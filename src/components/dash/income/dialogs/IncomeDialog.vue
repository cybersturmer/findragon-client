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
  name: 'IncomeDialog',
  setup () {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    return {
      dialogRef,
      onDialogHide
    }
  }
}
</script>
