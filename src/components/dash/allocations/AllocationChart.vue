<template>
  <DoughnutChart
    v-bind="doughnutChartProps" />
</template>

<script>
import { computed, defineComponent, getCurrentInstance } from 'vue'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const backgroundColor = [
  '#00aff5',
  '#9a6afa',
  '#d9c1ff',
  '#5ac098',
  '#8fbeb2',
  '#77ceff',
  '#0079af',
  '#123e6b'
]

export default defineComponent({
  name: 'AllocationChart',
  components: { DoughnutChart },
  props: {
    currentNode: Number
  },
  setup (props) {
    const $vueInstance = getCurrentInstance()
    const { $store } = $vueInstance.appContext.config.globalProperties

    const currentAllocations = computed(() => {
      return $store.getters['allocation/ALLOCATIONS_BY_PARENT'](props.currentNode)
    })

    const titles = computed(() => {
      return currentAllocations.value.map(obj => obj.title)
    })

    const dataValues = computed(() => currentAllocations.value.map(obj => obj.category_ratio / 100))

    const dataObject = computed(() => ({
      labels: titles.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor
        },
      ],
    }))

    const options = computed(() => ({
      responsive: true,
      scales: {
        myScale: {
          display: false,
          type: 'logarithmic',
          position: 'left',
        },
      },
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
        }
      },
    }))

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      height: 300,
      chartData: dataObject,
      options,
    })

    return {
      dataObject,
      options,
      doughnutChartProps,
      doughnutChartRef
    }
  }
})
</script>
