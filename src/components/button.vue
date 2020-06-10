<template>
  <span @click="buttonSelected" >
    Start here
  </span>
</template>

<script>
  export default {
    name: 'Button',
    data() {
      return {
        selected: false
      }
    },
    methods: {
      buttonSelected() {
        this.selected = true;
        this.$emit('button-clicked')

      }
    }
  }
</script>

<style lang="scss" scoped>
  span {
    display: block;
    background-color: #ffff;
    color: #193966;
    max-width: 50%;
    margin: 1rem auto;
  }
</style>