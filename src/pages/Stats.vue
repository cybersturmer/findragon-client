<template>
  <q-page padding>
    <div class="row items-start q-gutter-md">
      <div class="col-auto">
        <total-purchase-and-price-card
          :total-purchase="3000000"
          :total-price="4500000"
        />
      </div>
      <div class="col-auto">
        <income-card
          :total-income="1500000"
          :day-income="250000"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar'

import TotalPurchaseAndPriceCard from 'components/dash/stats/TotalPurchaseAndPriceCard.vue'
import IncomeCard from 'components/dash/stats/IncomeCard.vue'

const metaData = {
  title: 'Dashboard'
}

export default {
  name: 'Stats',
  components: {
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
