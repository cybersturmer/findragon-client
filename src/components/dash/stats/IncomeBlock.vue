<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle1 text-bold">
        Total Income: {{totalIncome}}
      </div>
      <div class="text-subtitle2">
        Day Income: {{dayIncome}}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'IncomeBlock',
  props: {
    totalIncome: {
      required: true
    },
    dayIncome: {
      required: true
    }
  },
  setup () {
    return {

    }
  }
}
</script>
