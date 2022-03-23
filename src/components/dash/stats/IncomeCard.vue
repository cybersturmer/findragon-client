<template>
  <q-card>
    <q-card-section>
      <div class="row items-end">
        <div class="col-auto">
          <q-icon
            :name="totalIncomeIconParams.icon"
            :color="totalIncomeIconParams.color"
            size="md"
          />
        </div>
        <div class="col text-subtitle1 text-bold">
          Total Income:
          <span :class="`text-${totalIncomeIconParams.color}`">
            {{totalIncomeIconParams.prefix}}{{totalIncome}}₽
          </span>
        </div>
      </div>
      <div class="row items-center">
        <div class="col-auto">
          <q-icon
            :name="dayIncomeIconParams.icon"
            :color="dayIncomeIconParams.color"
            size="md"
          />
        </div>
        <div class="col text-subtitle2">
          Day Income:
          <span :class="`text-${dayIncomeIconParams.color}`">
            {{dayIncomeIconParams.prefix}}{{dayIncome}}₽
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from 'vue'

const negativeIconAttrs = {
  icon: 'arrow_drop_down',
  color: 'negative',
  prefix: ''
}

const positiveIconAttrs = {
  icon: 'arrow_drop_up',
  color: 'positive',
  prefix: '+'
}

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

    return {
      dayIncomeIconParams,
      totalIncomeIconParams
    }
  }
}
</script>
