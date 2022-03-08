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
  '#4dc9f6',
  '#a67f65',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba',
  '#00aff5',
  '#6eb8b9',
  '#8fbeb2',
  '#9a6afa',
  '#5ac098',
  '#77ceff',
  '#d9c1ff',
  '#0079af',
]

const borderColor = [
  '#121212'
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
          backgroundColor,
          borderColor,
          borderWidth: 1
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
      width: 300,
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
