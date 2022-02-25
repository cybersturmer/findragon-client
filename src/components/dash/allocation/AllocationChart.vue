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
  '#77CEFF',
  '#0079AF',
  '#123E6B'
]

export default defineComponent({
  name: 'AllocationChart',
  components: { DoughnutChart },
  props: {
    row: Array,
  },
  setup (props) {
    const titles = props.row?.map(obj => obj.title)
    const values = props.row?.map(obj => obj.portfolio_ratio)

    if (!titles || !values) throw new Error('Title and value cannot be undefined')

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
