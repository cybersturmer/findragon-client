<template>
  <q-card bordered>
    <q-card-section class="dash_half_thin_widget">
      <div class="row items-center justify-center">
        <div class="col-auto">
          <q-icon
            name="account_balance"
            size="sm"
            class="q-pr-sm"
          />
        </div>
        <div class="col-auto text-center text-h5">
          {{ formattedTotalPrice }}
        </div>
      </div>
      <div class="row justify-center items-center">
        <div class="col text-center text-caption text-blue-grey-4">
          Purchase: {{formattedTotalPurchase}}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>



<script>
import { computed } from 'vue'

export default {
  name: 'TotalPurchaseAndPriceCard',
  props: {
    totalPurchase: {
      required: true
    },
    totalPrice: {
      required: true
    }
  },
  setup (props) {
    const formattedTotalPurchase = computed(() => {
      return Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB' // @todo change it to actual currency
      })
      .format(props.totalPurchase)
    })

    const formattedTotalPrice = computed(() => {
      return Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB' // @todo change it to actual currency
      })
      .format(props.totalPrice)
    })

    return {
      formattedTotalPrice,
      formattedTotalPurchase
    }
  }
}
</script>
