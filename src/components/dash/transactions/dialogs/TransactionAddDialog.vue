<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <!-- Select for assets -->
      <q-select
        v-model="transactionAsset"
        :options="filteredAssetsOptions"
        @filter="filterAssets"
        label="Asset"
        use-input
        clearable
      />
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
        autogrow
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
import {useDialogPluginComponent} from 'quasar'
import {computed, getCurrentInstance, onMounted, ref} from 'vue'

import {transactionTypesEnum} from 'src/services/enums'

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

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const todayString = new Date(Date.now()).toLocaleDateString()

    const assets = computed(() => $store.getters['asset/ASSETS'])
    const assetsOptions = computed(() => {
      return assets.value.map(option => ({ label: option.description, value: option.id }))
    })
    const filteredAssetsOptions = ref([])

    const transactionType = ref(transactionTypes[0])
    const transactionAsset = ref(assetsOptions.value[0])
    const transactionDate = ref(todayString)

    const transactionAmount = ref(null)
    const transactionPrice = ref(null)
    const transactionCommission = ref(null)
    const transactionNote = ref(null)

    onMounted(async () => {
      try {
        const { data } = await $api.get('/assets/')

        $store.commit('asset/SET_ASSETS', data)
      } catch (e) {
        console.error(e)
      }
    })

    const filterAssets = (val, update, abort) => {
      if (val === '') {
        update(() => {
          filteredAssetsOptions.value = assetsOptions.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filteredAssetsOptions.value = assetsOptions.value.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    const saveTransaction = async () => {
      try {

        const payload = {
          amount: transactionAmount.value,
          asset_type: transactionType.value.value,
          commission: transactionCommission.value,
          description: transactionNote.value,
          price: transactionPrice.value,
          type: transactionType.value.value,
          date: transactionDate.value,
          portfolio_id: 1
        }

        const { data } = await $api.post('/transactions/', payload)
        console.dir(data)
      } catch (e) {
        console.error(e)
      }
    }

    const onOKClick = () => {
      saveTransaction()
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
      assets,
      assetsOptions,
      filteredAssetsOptions,
      filterAssets,
      transactionAsset,
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
