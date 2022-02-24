<template>
  <DoughnutChart
    v-bind="doughnutChartProps" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import { Allocation } from 'components/models'

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
    row: Array as PropType<Allocation[]>,
  },
  setup (props) {
    const titles = props.row?.map(obj => obj.title)
    const values = props.row?.map(obj => obj.portfolio_ratio)

    if (!titles || !values) throw new Error('Title and value cannot be undefined')

    const dataObject = computed<ChartData<'doughnut'>>(() => ({
      labels: titles,
      datasets: [
        {
          data: values,
          backgroundColor
        },
      ],
    }))

    const options = computed<ChartOptions<'doughnut'>>(() => ({
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
