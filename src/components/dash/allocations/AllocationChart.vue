<template>
  <DoughnutChart
    v-bind="doughnutChartProps" />
</template>

<script>
import { computed, defineComponent, getCurrentInstance } from 'vue'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { allocationTypesEnum } from 'src/services/enums'

Chart.register(...registerables)

const chartPrimaryColor = '#4dc9f6'

const emptyDoughnutPlugin = {
  id: 'emptyDoughnut',
  afterDraw(chart, args, options) {
    const { datasets } = chart.data
    const { color, width, radiusDecrease } = options

    let hasData = false

    for (let i = 0; i < datasets.length; i += 1) {
      const dataset = datasets[i]
      hasData |= dataset.data.length > 0
    }

    if (!hasData) {
      const { chartArea: { left, top, right, bottom}, ctx} = chart
      const centerX = (left + right) / 2
      const centerY = (top + bottom) / 2

      const r = Math.min(right - left, bottom - top) / 2

      ctx.beginPath()
      ctx.lineWidth = width || 2
      ctx.setLineDash([2, 4])
      ctx.strokeStyle = color || chartPrimaryColor
      ctx.arc(centerX, centerY, (r - radiusDecrease || 0), 0, 2 * Math.PI)
      ctx.stroke()
    }
  }
}

const tooltipPlugin = (tooltipItem) => {
  return `${tooltipItem.label}: ${tooltipItem.parsed}%`
}

const backgroundColor = [
  chartPrimaryColor,
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
  emits: [
    'selected'
  ],
  props: {
    currentNode: Number
  },
  setup (props, { emit }) {
    const $vueInstance = getCurrentInstance()
    const { $store } = $vueInstance.appContext.config.globalProperties

    const currentAllocations = computed(() => {
      return $store.getters['allocation/ALLOCATIONS_BY_PARENT'](props.currentNode)
    })

    const titles = computed(() => {
      return currentAllocations.value.map(obj => obj.title)
    })

    const dataValues = computed(() => currentAllocations.value.map(obj => obj.category_ratio / 100))
    const ids = computed(() => currentAllocations.value.map(obj => obj.id))

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
      onClick: (event, array) => {
        const dataIndex = array.pop().element?.$context?.dataIndex
        const allocation = currentAllocations?.value[dataIndex]

        if (allocation.type === allocationTypesEnum.CATEGORY) {
          emit('selected', allocation.id)
        }
      },
      scales: {
        myScale: {
          display: false,
          type: 'logarithmic',
          position: 'left',
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: tooltipPlugin
          }
        },
        legend: {
          display: false,
          position: 'bottom',
        },
        emptyDoughnut: {
          color: chartPrimaryColor,
          width: 2,
          radiusDecrease: 20
        }
      },
    }))

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      height: 300,
      width: 300,
      chartData: dataObject,
      options,
      plugins: [
        emptyDoughnutPlugin
      ]
    })

    return {
      ids,
      dataObject,
      options,
      doughnutChartProps,
      currentAllocations,
      doughnutChartRef
    }
  }
})
</script>
