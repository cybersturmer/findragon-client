<template>
  <q-page padding>
    <div class="row items-start q-gutter-md">
      <div class="col-auto">
        <total-purchase-and-price-card
          :total-purchase="3000000"
          :total-price="4500000"
        />
      </div>
      <div class="col-grow">
        <income-card
          :total-income="1500000"
          :day-income="250000"
        />
      </div>
      <div class="col-auto">
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
