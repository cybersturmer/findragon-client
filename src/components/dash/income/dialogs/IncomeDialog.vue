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
      <q-select
        v-model="incomeType"
        :options="incomesOptions"
        label="Transaction Type"
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
        const payload = {
          operation: 1,
          date: "2022-03-19",
          amount: 0,
          price: 0,
          tax: 0,
          description: "string",
          currency: "RUB",
          portfolio_id: 0,
          ticker: "string",
          exchange: "string"
        }

        const { data } = await $api.post('/incomes/', payload)

        $store.commit('incomes/ADD_INCOME', data)
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
      isEditing,
      onDialogHide,
      filterAssets,
      onOKClick,
      incomeType,
      incomeAmount,
      incomeAsset,
      incomeCurrency,
      incomesOptions,
      incomeDate,
      incomePrice,
      incomeTax,
      filteredAssetsOptions
    }
  }
}
</script>
