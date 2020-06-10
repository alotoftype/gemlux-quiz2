<template>
  <div class="quiz">
    {{ currentQuestion }}
    <Question
      :key="questions[currentQuestion].question"
      :question="questions[currentQuestion]"
    ></Question>
    <div class="buttons">
      <span @click="goBack" v-show="currentQuestion > 0">Go Back</span>
      <span @click="goForward" v-show="currentQuestion < questions.length">Keep Going</span>
    </div>
  </div>
</template>

<script>
  import Question from './question';
  export default {
    name: 'Questionaire',
    props: {
      questions: Array,
      currentQuestion: Number
    },
    components: {
      Question
    },

    methods: {
      goBack() {
        console.log("this goes back",this.currentQuestion)
        if(this.$parent.currentQuestion > 0 && this.$parent.currentQuestion != 0){
           return this.$parent.currentQuestion -= 1;
        }
      },
      goForward(){
        console.log("this goes forward",this.currentQuestion)
        if(this.$parent.currentQuestion <= this.questions.length){
          return this.$parent.currentQuestion += 1;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.buttons {
  margin: 2rem auto;
}
 span {
   border: 1px solid #193966;
   padding: 1rem 2rem;
  &:hover,  {
    color: #fff;
    background-color: #193966;
  }
 }
 .active {
  color: #fff;
  background-color: #193966; 
 }
</style>