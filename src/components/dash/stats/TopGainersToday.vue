<template>
  <q-card bordered>
    <q-card-section class="row items-stretch justify-between">
      <div class="col text-h6">TOP Gainers</div>
      <div class="col-auto">
        <q-btn
          flat
          round
          :icon="changeIcon"
          size="sm"
          @click="switchChangeView"
        />
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      Content
    </q-card-section>
  </q-card>
</template>

<script>
import { percentChange, rawChange } from './presets'
import { computed } from 'vue'

export default {
  name: 'TopGainersToday',
  props: {
    isChangeInPercentage: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'switchedChangedView'
  ],
  setup (props, { emit }) {

    const changeIcon = computed(() => {
      return props.isChangeInPercentage ? percentChange.icon : rawChange.icon
    })

    const switchChangeView = () => {
      emit('switchedChangedView')
    }

    return {
      changeIcon,
      switchChangeView
    }
  }
}
</script>
