<template>
  <q-card bordered>
    <q-card-section class="row items-stretch justify-between">
      <div class="col text-h6">TOP Losers</div>
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
      <q-list dense>
        <q-item v-for="asset in top">
          <q-item-section side>
            {{ asset.code }}
          </q-item-section>
          <q-item-section v-if="!isChangeInPercentage">
            {{ asset.portfolio_change }}
          </q-item-section>
          <q-item-section v-else>
            {{ asset.portfolio_change_p }}%
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { percentChange, rawChange } from './presets'
import { computed } from 'vue'

export default {
  name: 'TopLosersToday',
  props: {
    isChangeInPercentage: {
      type: Boolean,
      default: false
    },
    top: {
      type: Array,
      default: []
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
