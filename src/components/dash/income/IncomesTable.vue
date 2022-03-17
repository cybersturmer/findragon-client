<template>
  <div>My component</div>
</template>

<script>
export default {
  name: 'IncomesTable',
  props: {
    incomes: Array,
    isEditing: Boolean
  },
  setup () {
    return {

    }
  }
}
</script>
