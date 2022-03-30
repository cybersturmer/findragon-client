<template>
  <q-card bordered>
    <q-card-section class="dash_half_thin_widget q-px-xl">
      <div class="row items-center">
        <div class="col-auto">
          <q-icon
            name="account_balance"
            size="sm" />
        </div>
        <div class="col-auto text-h5 q-pl-md">
          {{ formattedTotalPrice }}
        </div>
      </div>
      <div class="row">
        <div class="col-auto text-caption q-pl-xl text-blue-grey-4">
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
