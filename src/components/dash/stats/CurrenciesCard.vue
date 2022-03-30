<template>
  <q-card bordered>
    <q-card-section
      class="dash_half_thin_widget">
      <div v-for="item in example" class="row items-center justify-center">
        <div class="col-auto text-subtitle2 text-bold">
          {{ item.fromCurrency }}/{{ item.toCurrency }}
        </div>
        <div class="col-auto">
          <q-icon
            :name="item.dayGainPercent > 0 ? positiveIconAttrs.icon : negativeIconAttrs.icon"
            :color="item.dayGainPercent > 0 ? positiveIconAttrs.color : negativeIconAttrs.color"
            size="30px"
          />
        </div>
        <div class="col-auto text-subtitle1 q-pr-md">
          {{ item.price }}
        </div>
        <div :class="`col-auto text-caption text-${item.dayGainPercent > 0 ? positiveIconAttrs.color : negativeIconAttrs.color }`">
          {{ item.dayGainPercent }}%
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { positiveIconAttrs, negativeIconAttrs } from './presets'

const example = [
  {
    "ticker": "USDRUB",
    "fromCurrency": "USD",
    "toCurrency": "RUB",
    "price": 101.25,
    "previousClose": 96.715,
    "dayGainPercent": -4.69
  },
  {
    "ticker": "EURRUB",
    "fromCurrency": "EUR",
    "toCurrency": "RUB",
    "price": 111.31,
    "dayGain": 4.845249672072675,
    "dayGainPercent": 4.55
  }
]

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
    return {
      example,
      positiveIconAttrs,
      negativeIconAttrs
    }
  }
}
</script>
