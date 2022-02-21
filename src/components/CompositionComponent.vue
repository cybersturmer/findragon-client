<template>
  <div style="width: 400px">
    <div style='display: flex; justify-content: center'>
      <button type="button" @click="shuffleData">Shuffle</button>
      <button type="button" @click="switchLegend">Swicth legends</button>
    </div>
    <DoughnutChart v-bind="doughnutChartProps" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue'
import { Todo, Meta } from './models'
import { shuffle } from 'lodash'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'

Chart.register(...registerables)

function useClickCount() {
  const clickCount = ref(0)
  function increment() {
    clickCount.value += 1
    return clickCount.value
  }

  return { clickCount, increment }
}

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length)
  return { todoCount }
}

export default defineComponent({
  name: 'CompositionComponent',
  components: { DoughnutChart },
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => [],
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    const dataValues = ref([30, 40, 60, 70, 5])
    const toggleLegend = ref(true)

    const testData = computed<ChartData<'doughnut'>>(() => ({
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            '#77CEFF',
            '#0079AF',
            '#123E6B',
            '#97B0C4',
            '#A5C8ED',
          ],
        },
      ],
    }))

    const options = computed<ChartOptions<'doughnut'>>(() => ({
      scales: {
        myScale: {
          type: 'logarithmic',
          position: toggleLegend.value ? 'left' : 'right',
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? 'top' : 'bottom',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart',
        },
      },
    }))

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    })

    function shuffleData() {
      dataValues.value = shuffle(dataValues.value)
      console.log(doughnutChartRef.value?.chartInstance)
    }

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value
    }

    return {
      ...useClickCount(),
      ...useDisplayTodo(toRef(props, 'todos')),
      shuffleData,
      switchLegend,
      options,
      testData,
      doughnutChartProps,
      doughnutChartRef
    }
  },
})
</script>
