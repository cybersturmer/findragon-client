<template>
  <DoughnutChart
    v-bind="doughnutChartProps" />
</template>

<script>
import { computed, defineComponent } from 'vue'
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
    row: Array,
  },
  setup (props) {
    const titles = props.row?.map(obj => obj.title)
    const values = props.row?.map(obj => obj.portfolio_ratio / 100)

    const dataObject = computed(() => ({
      labels: titles,
      datasets: [
        {
          data: values,
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
