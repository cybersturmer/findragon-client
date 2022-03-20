<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-px-md q-py-sm">
      <!-- Select for assets -->
      <q-select
        v-model="incomeAsset"
        :options="filteredAssetsOptions"
        @filter="filterAssets"
        label="Asset"
        use-input
        clearable
      />
      <!-- Income Type -->
      <div class="row">
        <div class="col q-pr-sm">
          <q-select
            v-model="incomeType"
            :options="incomesOptions"
            label="Income Type"
          />
        </div>
        <div class="col q-pr-sm">
          <q-select
            v-model="incomeCurrency"
            label="Commission currency"
            :options="currenciesOptions"
          />
        </div>
      </div>
      <!-- Date -->
      <q-date
        v-model="incomeDate"
        :mask="dateFormat"
        minimal
        flat
      />
      <div class="row">
        <div class="col">
          <!-- Amount -->
          <q-input
            v-model="incomeAmount"
            type="number"
            label="Amount"
          />
        </div>
      </div>
      <div class="row">
        <div class="col q-pr-sm">
          <!-- Tax -->
          <q-input
            square
            v-model="incomeTax"
            type="number"
            step="0.1"
            label="Tax"
          />
        </div>
        <div class="col q-pr-sm">
          <!-- Price -->
          <q-input
            square
            v-model="incomePrice"
            type="number"
            step="0.1"
            label="Price"
          />
        </div>
      </div>
      <q-input
        autogrow
        v-model="incomeNote"
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
import { incomesOptions, currenciesOptions, incomeTypesEnum } from 'src/services/enums'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

const dateFormat = 'MM/DD/YYYY'

export default {
  name: 'IncomeDialog',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  props: {
    editing: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    const $vueInstance = getCurrentInstance()
    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const todayString = quasarDate.formatDate(new Date(), dateFormat)

    const assets = computed(() => $store.getters['asset/ASSETS'])
    const assetsOptions = computed(() => {
      return assets.value.map(option => ({ label: option.description, value: option.id }))
    })

    const filteredAssetsOptions = ref([])

    const incomeType = ref(incomesOptions[0])
    const incomeAsset = ref(assetsOptions.value[0])
    const incomeDate = ref(todayString)

    const incomeCurrency = ref(currenciesOptions[0])
    const incomeAmount = ref(null)
    const incomePrice = ref(null)

    const incomeTax = ref(null)

    const incomeNote = ref('')

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

    const isEditing = computed(() => {
      return props.editing
    })

    const saveIncome = async () => {
      try {
        const asset = $store.getters['asset/ASSET_BY_ID'](incomeAsset.value.value)

        const payload = {
          operation: 1,
          date: quasarDate.formatDate(incomeDate.value, 'YYYY-MM-DD'),
          amount: parseInt(incomeAmount.value),
          price: parseInt(incomePrice.value),
          tax: parseInt(incomeTax.value),
          description: incomeNote.value,
          currency: incomeCurrency.value.value,
          portfolio_id: 1,  // @todo Replace hardcoded portfolio_id
          ticker: asset.ticker,
          exchange: asset.exchange
        }

        const { data } = await $api.post('/incomes/', payload)

        $store.commit('income/ADD_INCOME', data)
      } catch (e) {
        console.error(e)
      }
    }

    const onOKClick = () => {
      saveIncome()
      onDialogOK()
    }

    return {
      dialogRef,
      dateFormat,
      isEditing,
      onDialogHide,
      filterAssets,
      onOKClick,
      incomeType,
      incomeNote,
      incomeAmount,
      incomeAsset,
      incomeCurrency,
      incomesOptions,
      incomeDate,
      incomePrice,
      incomeTax,
      filteredAssetsOptions,
      currenciesOptions
    }
  }
}
</script>
