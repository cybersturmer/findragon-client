<template>
  <q-page padding>
    <div>
      <div class="column items-end q-pb-md">
        <div class="col">
          <q-btn-group>
            <q-btn
              label="Add income"
              @click="openAddIncomeDialog"
            />
            <q-btn
              v-if="!isEditing"
              flat
              label="Edit"
              @click="changeEditingMode"
            />
          </q-btn-group>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <incomes-table
            :incomes="incomes"
            :is-editing="isEditing"
            @completed="isEditing = !isEditing"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta, useQuasar } from 'quasar'
import { getCurrentInstance, onMounted, ref, computed } from 'vue'

import IncomesTable from 'components/dash/income/IncomesTable.vue'
import IncomeDialog from 'components/dash/income/dialogs/IncomeDialog.vue'

const metaData = {
  title: 'Incomes'
}

export default {
  name: 'Incomes',
  components: {
    IncomesTable
  },
  setup () {
    useMeta(metaData)

    const $vueInstance = getCurrentInstance()
    const $q = useQuasar()

    const isEditing = ref(false)
    const changeEditingMode = () => {
      isEditing.value = !isEditing.value
    }

    const { $api, $store } = $vueInstance.appContext.config.globalProperties
    const incomes = computed(() => $store.getters['income/INCOMES'])

    const openEditIncomeDialog = () => {
      $q.dialog({
        component: IncomeDialog,
        componentProps: {
          editing: true
        },
        parent: this,
        cancel: true,
        persistent: true
      })
    }

    const openAddIncomeDialog = () => {
      $q.dialog({
        component: IncomeDialog,
        componentProps: {
          editing: false
        },
        parent: this,
        cancel: true,
        persistent: true
      })
    }

    onMounted(async () => {
      try {
        const { data } = await $api.get('/incomes/')

        $store.commit('income/SET_INCOMES', data)
      } catch (e) {
        console.error(e)
      }
    })

    const isDataAvailable = computed(() => {
      return Array.isArray(incomes.value) && incomes.value.length > 0
    })

    return {
      incomes,
      isEditing,
      changeEditingMode,
      openAddIncomeDialog
    }
  }
}
</script>
