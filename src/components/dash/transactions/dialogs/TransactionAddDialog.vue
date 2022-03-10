<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-card-actions vertical>
        <!-- Select for assets -->
        <!-- Transaction Type -->
        <!-- Date -->
        <!-- Amount -->
        <!-- Price -->
        <!-- Commission -->
        <!-- Currency -->
        <!-- Note -->
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

export default {
  name: 'TransactionAddDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOk, onDialogCancel } = useDialogPluginComponent()

    const onOKClick = () => {
      onDialogOk()
    }

    return {
      dialogRef,
      onDialogHide,
      onOKClick,
      onDialogCancel
    }
  }
}
</script>
