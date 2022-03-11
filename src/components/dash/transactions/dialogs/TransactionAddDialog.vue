<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
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
        mask="MM/DD/YYYY"
        minimal
      />
      <!-- Amount -->
      <q-input
        v-model="transactionAmount"
        type="number"
        label="Amount"
      />
      <!-- Price -->
      <q-input
        square
        v-model="transactionPrice"
        type="number"
        label="Price"
      />
      <!-- Commission -->
      <q-input
        v-model="transactionCommission"
        type="number"
        label="Commission"
      />
      <!-- Currency -->
      <!-- @todo preselect currency for chosen asset -->
      <!-- Note -->
      <q-input
        v-model="transactionNote"
        type="textarea"
        label="Notes"
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
import { ref } from 'vue'

import { transactionTypesEnum } from 'src/services/enums'

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

    const transactionType = ref(transactionTypes[0])
    const transactionDate = ref(todayString)

    const transactionAmount = ref(null)
    const transactionPrice = ref(null)
    const transactionCommission = ref(null)
    const transactionNote = ref(null)

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
      transactionAmount,
      transactionPrice,
      transactionNote,
      transactionCommission
    }
  }
}
</script>

<style lang="css">
 .q-date {
   width: auto;
 }

 .q-date__view {
   min-height: auto;
   padding: 16px 0 0 0;
 }

 .q-date__calendar-days-container {
   min-height: auto;
 }
</style>
