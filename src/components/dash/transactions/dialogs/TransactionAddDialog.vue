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
        :mask="dateFormat"
        minimal
        flat
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
        step="0.01"
        label="Price"
      />
      <!-- Note -->
      <div class="row">
        <div class="col q-pr-sm">
          <!-- Commission -->
          <q-input
            v-model.number="transactionCommission"
            type="number"
            step="0.01"
            label="Commission"
          />
        </div>
        <div class="col q-pl-sm">
          <q-select
            v-model="transactionCommissionCurrency"
            label="Commission currency"
            :options="currenciesOptions"
          />
        </div>
      </div>
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
import { useDialogPluginComponent, date as quasarDate } from 'quasar'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

import { transactionTypesEnum, currenciesOptions } from 'src/services/enums'

const dateFormat = 'MM/DD/YYYY'

const transactionTypes = [
  {
    label: 'Buy',
    value: transactionTypesEnum.BUY
  },
  {
    label: 'Sell',
    value: transactionTypesEnum.SELL
  }
]

export default {
  name: 'TransactionAddDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const todayString = quasarDate.formatDate(new Date(), dateFormat)

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
    const transactionCommission = ref(0.0)
    const transactionCommissionCurrency = ref(currenciesOptions[0])
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
        const asset = $store.getters['asset/ASSET_BY_ID'](transactionAsset.value.value)
        const payload = {
          amount: parseInt(transactionAmount.value),
          asset_type: 2,
          ticker: asset.ticker,
          exchange: asset.exchange,
          commission: transactionCommission.value,
          currency: transactionCommissionCurrency.value.value,
          description: transactionNote.value,
          price: transactionPrice.value,
          type: transactionType.value.value,
          date: quasarDate.formatDate(transactionDate.value, 'YYYY-MM-DD'),
          portfolio_id: 1  // @todo Replace hardcoded portfolio_id
        }

        const { data } = await $api.post('/transactions/', payload)

        $store.commit('transaction/ADD_TRANSACTION', data)
      } catch (e) {
        console.error(e)
      }
    }

    const onOKClick = () => {
      saveTransaction()
      onDialogOK()
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
      dateFormat,
      assetsOptions,
      filteredAssetsOptions,
      filterAssets,
      transactionAsset,
      transactionPrice,
      transactionNote,
      transactionCommission,
      transactionCommissionCurrency,
      currenciesOptions
    }
  }
}
</script>
