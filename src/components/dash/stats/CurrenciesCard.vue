<template>
  <q-card bordered>
    <q-card-section class="dash_half_thin_widget">
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CurrenciesCard',
  props: {
    currencyRates: {
      type: Array,
      required: false,
      default: []
    }
  },
  setup () {
    return {}
  }
}
</script>
