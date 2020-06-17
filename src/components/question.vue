<template>
  <div>
    <h3>{{ question.question_text }}</h3>
      <div class="option_container" v-if="currentQuestion == 2">
        <Option
      v-for="option in question.options.filter(option => option.type === previousQuestion)"
      :key="option.product_id"
      :option="option"
      :benefits="question.benefits"
      ></Option>
      </div>
       <div class="option_container" v-else>
        <Option
      v-for="option in question.options"
      :key="option.product_id"
      :option="option"
      :benefits="question.benefits"
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
      question: Object,
      currentQuestion: Number
    },
    computed: {
      previousQuestion(){
        if(this.$parent.results.length != 0){
          let answer = this.$parent.results[0];
          console.log(answer,)
        return answer.outrigger.replace(" ", "-");
        } else {
            return null;
        }
      }
    },
    methods: {
      
      subsetOptions(arr, filter){
        if(arr && arr.length > 0){
          console.log('this subset is "deluxe"', arr)
          return arr.filter( option => { option.type == filter })
        } else {
          return arr
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.option_container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

@media screen and (min-width: 768px) {
  flex-direction: row;
}
}
h3 {
      text-align: center;
    }
</style>