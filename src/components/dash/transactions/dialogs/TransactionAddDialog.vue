<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <q-card-actions vertical>
        <!-- Select for assets -->
        <!-- Transaction Type -->
        <q-select
          v-model="transactionType"
          :options="transactionTypes"
          label="Transaction Type"
        />
        <!-- Date -->
        <q-date
          v-model="transactionDate"
          minimal
        />
        <!-- Amount -->
        <q-input
          v-model="transactionAmount"
          type="number"
          label="Amount"
        />
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
import { ref } from 'vue'

const transactionTypesEnum = {
  BUY: 1,
  SELL: 2,
  DIVIDENDS: 3,
  COUPON: 4
}

const transactionTypes = [
  {
    label: 'Buy',
    value: transactionTypesEnum.BUY
  },
  {
    label: 'Sell',
    value: transactionTypesEnum.SELL
  },
  {
    label: 'Dividends',
    value: transactionTypesEnum.DIVIDENDS
  },
  {
    label: 'Coupon',
    value: transactionTypesEnum.COUPON
  }
]

export default {
  name: 'TransactionAddDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOk, onDialogCancel } = useDialogPluginComponent()

    const todayString = new Date(Date.now()).toLocaleDateString()

    const transactionType = ref(null)
    const transactionDate = ref(todayString)
    const transactionAmount = ref(1)

    const onOKClick = () => {
      onDialogOk()
    }

    return {
      dialogRef,
      onDialogHide,
      onOKClick,
      onDialogCancel,
      transactionType,
      transactionDate,
      transactionTypes,
      transactionAmount
    }
  }
}
</script>
