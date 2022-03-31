<template>
  <q-card bordered>
    <q-card-section class="row items-stretch justify-between">
      <div class="col text-h6">TOP Losers</div>
      <div class="col-auto">
        <q-btn
          flat
          round
          icon="percent"
          size="sm"
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
export default {
  name: 'TopLosersToday',
  setup () {
    return {}
  }
}
</script>
