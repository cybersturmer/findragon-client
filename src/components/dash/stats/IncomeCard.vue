<template>
  <q-card bordered>
    <q-card-section class="dash_half_thin_widget q-px-xl">
      <div class="row items-center">
        <div class="col text-subtitle1 text-bold">
          Total Income:
        </div>
        <div class="col-auto">
          <q-icon
            :name="totalIncomeIconParams.icon"
            :color="totalIncomeIconParams.color"
            size="sm"
          />
        </div>
        <div class="col">
          <span :class="`text-${totalIncomeIconParams.color}`">
            {{totalIncomeFormattedString}}
          </span>
        </div>
      </div>
      <div class="row items-center">
        <div class="col">
          Day Income:
        </div>
        <div class="col-auto">
          <q-icon
            :name="dayIncomeIconParams.icon"
            :color="dayIncomeIconParams.color"
            size="sm"
          />
        </div>
        <div class="col text-caption">
          <span :class="`text-${dayIncomeIconParams.color}`">
            {{dayIncomeFormattedString}}
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from 'vue'
import { negativeIconAttrs, positiveIconAttrs } from './presets'

export default {
  name: 'IncomeCard',
  props: {
    totalIncome: {
      required: true
    },
    dayIncome: {
      required: true
    }
  },
  setup (props) {
    const dayIncomeIconParams = computed(() => {
      return props.dayIncome > 0 ? positiveIconAttrs : negativeIconAttrs
    })

    const totalIncomeIconParams = computed(() => {
      return props.totalIncome > 0 ? positiveIconAttrs : negativeIconAttrs
    })

    const totalIncomeFormattedString = computed(() => {
      return Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUR' // @todo change it to actual currency
      })
        .format(props.totalIncome)
    })

    const dayIncomeFormattedString = computed(() => {
      return Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUR' // @todo change it to actual currency
      })
        .format(props.dayIncome)
    })

    return {
      dayIncomeIconParams,
      totalIncomeIconParams,
      dayIncomeFormattedString,
      totalIncomeFormattedString
    }
  }
}
</script>
