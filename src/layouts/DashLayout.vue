<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-10">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> FinDragon </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above

      width="180"
      breakpoint="500"

      bordered
      mini

      class="bg-grey-10"
    >
      <q-list padding>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Allocation',
    caption: null,
    icon: 'donut_small',
    route: 'allocations_view',
  },
  {
    title: 'Assets',
    caption: null,
    icon: 'business_center',
    route: 'assets_view',
  },
  {
    title: 'Transactions',
    caption: null,
    icon: 'shopping_bag',
    route: 'transactions_view'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DashLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer
    }
  },
})
</script>
