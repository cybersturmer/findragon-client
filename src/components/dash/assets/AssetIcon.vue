<template>
  <div class="col col-auto q-pa-xs bg-grey-3" style="border-radius: 5px">
    <q-img
      height="30px"
      width="30px"
      fit="scale-down"
      :src="`https://eodhistoricaldata.com/img/logos/${exchange}/${ticker}.png`"
    />
  </div>
</template>

<script>
export default {
  name: 'AssetIcon',
  props: {
    ticker: {
      type: String,
      required: true
    },
     exchange: {
      type: String,
      required: true
     }
  },
  setup () {
    return {}
  }
}
</script>
