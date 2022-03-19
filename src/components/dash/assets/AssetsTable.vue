<template>
  <q-scroll-area style="height: 90vh">
    <q-table
      flat
      bordered
      separator="horizontal"
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="filteredAssets"
      :pagination="pagination"
    >
      <template #body-cell-title="props">
        <q-td key="title" :props="props">
          <div class="row items-center">
            <asset-icon
              :ticker="props.row.ticker"
              :exchange="props.row.exchange"
            />
            <div class="col q-pa-md">
              {{ props.value }}
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-scroll-area>
</template>

<script>
import { computed, ref } from 'vue'
import AssetIcon from 'src/components/dash/assets/AssetIcon.vue'

const pagination = {
  sortBy: 'amount',
  descending: true
}

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row) => row.description ?
      row.description :
      `${row.ticker}.${row.exchange}`,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'ticker',
    required: true,
    label: 'Ticker',
    align: 'center',
    field: (row) => row.ticker,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'exchange',
    required: true,
    label: 'Exchange',
    align: 'center',
    field: (row) => row.exchange,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'center',
    field: (row) => row.amount,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'total_price',
    required: true,
    label: 'Total price',
    align: 'center',
    field: (row) => row.total_price,
    format: (val) => `${ val ? val : '-' }`,
    sortable: true
  },
  {
    name: 'avg_price',
    required: true,
    label: 'Average price',
    align: 'center',
    field: (row) => row.avg_price,
    format: (val) => `${ val ? val : '-' }`,
    sortable: true
  }
]

export default {
  name: 'AssetsTable',
  components: {
    AssetIcon
  },
  props: {
    assets: Array
  },
  setup (props) {
    const showSold = ref(true)

    const filteredAssets = computed(() => {
      if (showSold) {
        return props.assets
      } else {
        return props.assets.filter(asset => asset.amount > 0)
      }
    })

    return {
      columns,
      pagination,
      filteredAssets
    }
  }
}
</script>
