<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle1 text-bold">
        Total Price: {{totalPrice}}
      </div>
      <div class="text-subtitle2">
        Total Purchase: {{totalPurchase}}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
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
  setup () {
    return {}
  }
}
</script>
