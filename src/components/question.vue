<template>
  <div>
    <h3>{{ question.question_text }}</h3>
      <div class="option_container">
        <Option
      v-for="option in subsetOptions()"
      :key="option.product_id"
      :option="option"
      :benefits="question.benefits"
      
      ></Option>

      </div>
            {{ previousQuestion() }}
            {{ question.options.filter(option => 'blueWater-base').length }}
            {{ subsetOptions().length }}
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
    },
    methods: {
      previousQuestion(){
        if(this.$parent.results.length != 0){
          let answer = this.$parent.results[0];
        return answer.outrigger;
        } else {
            return null;
        }
      },
      subsetOptions(){
        if(this.previousQuestion() == 'deluxe-base'){
          console.log('this subset is "deluxe" ')
          return this.question.options.filter( option => { console.log(option); option.type == 'deluxe-base' })
        } else if (this.previousQuestion() == 'costal-base'){
          console.log('this subset is "costal" ')
          return this.question.options.filter( option => option.type == 'costal-base')
        } else if (this.previousQuestion() == 'blueWater-base'){
          console.log('this subset is "blue-water" ')
          return this.question.options.filter( option => option.type == 'bluewater-base')
        } else {
          return this.question.options
        }
        
      }
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