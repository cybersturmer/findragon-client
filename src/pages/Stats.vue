<template>
  <q-page padding>
    <div class="row items-center q-gutter-md">
      <div class="col">
        <total-purchase-and-price-card
          :total-purchase="3162948.23"
          :total-price="4587397.78"
        />
      </div>
      <div class="col">
        <income-card
          :total-income="1424449.55"
          :day-income="254938.11"
        />
      </div>
      <div class="col">
        <currencies-card
          :currency-rates="[]"
        />
      </div>
    </div>
    <div class="row items-center q-py-md q-gutter-md">
      <div class="col">
        <!-- We will use this block for Top Gainers Today -->
        <top-losers-today
          :isChangeInPercentage="isChangeInPercentage"
          :top="assetsTopLosers"
          @switchedChangedView="toggleChangeView"
        />
      </div>
      <div class="col">
        <!--  We will use this block for Top Losers Today -->
        <top-gainers-today
          :isChangeInPercentage="isChangeInPercentage"
          :top="assetsTopGainers"
          @switchedChangedView="toggleChangeView"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta, useQuasar } from 'quasar'
import { ref, getCurrentInstance, onMounted, computed } from 'vue'

import TotalPurchaseAndPriceCard from 'components/dash/stats/TotalPurchaseAndPriceCard.vue'
import CurrenciesCard from 'components/dash/stats/CurrenciesCard.vue'
import IncomeCard from 'components/dash/stats/IncomeCard.vue'
import TopLosersToday from 'components/dash/stats/TopLosersToday.vue'
import TopGainersToday from 'components/dash/stats/TopGainersToday.vue'

const metaData = {
  title: 'Dashboard'
}

export default {
  name: 'Stats',
  components: {
    TopGainersToday,
    TopLosersToday,
    CurrenciesCard,
    TotalPurchaseAndPriceCard,
    IncomeCard
  },
  setup () {
    useMeta(metaData)

    const $vueInstance = getCurrentInstance()
    const $q = useQuasar()

    const { $api, $store } = $vueInstance.appContext.config.globalProperties

    const isChangeInPercentage = ref(false)

    const toggleChangeView = () => {
      isChangeInPercentage.value = !isChangeInPercentage.value
    }

    const assets = computed(() => {
      return $store.getters['stats/ASSETS']
    })

    const maxTopAmount = ref(5)

    const assetsTopLosers = computed(() => {
      return $store.getters['stats/ASSETS_TOP_LOSERS'](maxTopAmount.value)
    })

    const assetsTopGainers = computed(() => {
      return $store.getters['stats/ASSETS_TOP_GAINERS'](maxTopAmount.value)
    })

    onMounted(async () => {
      try {
        const { data } = await $api.get('/stats/assets/')
        $store.commit('stats/SET_ASSETS', data)
      }
      catch (e) {
        console.error(e)
      }
    })

    return {
      assets,
      assetsTopLosers,
      assetsTopGainers,
      toggleChangeView,
      isChangeInPercentage
    }
  }
}
</script>
