<template>
  <q-item
    clickable
    manual-focus
    v-ripple
    :to="{ name: route }"
    active-class="text-grey-5"
  >
    <q-item-section
      v-if="icon"
      avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label
        v-if="caption"
        caption
        class="text-grey-1">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    route: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },
})
</script>
