<template>
  <q-page padding>
    <div class="row items-start q-gutter-md">
      <div class="col">
        <total-block
          :total-purchase="3000000"
          :total-price="4500000"
        />
      </div>
      <div class="col">
        <income-block
          :total-income="1500000"
          :day-income="250000"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar'

import TotalBlock from 'components/dash/stats/TotalBlock.vue'
import IncomeBlock from 'components/dash/stats/IncomeBlock.vue'

const metaData = {
  title: 'Dashboard'
}

export default {
  name: 'Stats',
  components: {
    TotalBlock,
    IncomeBlock
  },
  setup () {
    useMeta(metaData)

    return {

    }
  }
}
</script>
