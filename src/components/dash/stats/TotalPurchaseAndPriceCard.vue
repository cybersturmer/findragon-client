<template>
  <q-card bordered>
    <q-card-section class="dash_half_thin_widget">
      <div class="row items-end q-pa-sm">
        <div class="col">
          <div class="row">
            <div class="col-auto q-pr-md">
              <q-icon
                name="account_balance"
                size="52px" />
            </div>
            <div class="col text-h5">
              <div>
                {{ formattedTotalPrice }}
              </div>
              <div class="col-auto text-caption text-blue-grey-4">
                Purchase: {{formattedTotalPurchase}}
              </div>
            </div>

          </div>
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
        currency: 'RUR' // @todo change it to actual currency
      })
      .format(props.totalPurchase)
    })

    const formattedTotalPrice = computed(() => {
      return Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUR' // @todo change it to actual currency
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
