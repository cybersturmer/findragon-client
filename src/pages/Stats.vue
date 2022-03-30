<template>
  <q-page padding>
    <div class="row items-start q-gutter-md">
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
  </q-page>
</template>

<script>
import { useMeta } from 'quasar'

import TotalPurchaseAndPriceCard from 'components/dash/stats/TotalPurchaseAndPriceCard.vue'
import CurrenciesCard from 'components/dash/stats/CurrenciesCard.vue'
import IncomeCard from 'components/dash/stats/IncomeCard.vue'

const metaData = {
  title: 'Dashboard'
}

export default {
  name: 'Stats',
  components: {
    CurrenciesCard,
    TotalPurchaseAndPriceCard,
    IncomeCard
  },
  setup () {
    useMeta(metaData)

    return {

    }
  }
}
</script>
