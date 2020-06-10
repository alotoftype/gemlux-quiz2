<template>
  <div>
    <h3>{{ question.question_text }}</h3>
      <div class="option_container">
        <Option
      v-for="option in question.options"
      :key="option.id"
      :option="option"
      ></Option>
      </div>
      
  </div>
</template>

<script>
  import Option from './option';
  export default {
    name: 'Question',
    components: {
      Option
    },
    props: {
      question: Object
    }
  }
</script>

<style lang="scss" scoped>
.option_container {
  display: flex;
  justify-content: space-around;
}
h3 {
      text-align: center;
    }
</style>