<template>
  <div class="quiz">
    <Question
      :key="questions[currentQuestion].index"
      :question="questions[currentQuestion]"
      :currentQuestion="currentQuestion"
      @selection-made="saveResults"
    ></Question>
    <div class="buttons">
      <span @click="startOver" v-show="currentQuestion > 0">Start Over</span>
      <span @click="goBack" v-show="currentQuestion > 0">Go Back</span>
      <span @click="goForward" v-show="currentQuestion < questions.length && !showResults">keep going</span>
      <span @click="renderResults" v-show="showResults">Show Results</span>
    </div>
  </div>
</template>

<script>
  import Question from './question';
  export default {
    name: 'Questionaire',
    props: {
      questions: Array,
      currentQuestion: Number,
      results: Array
    },
    components: {
      Question
    },
    computed: {
      showResults: function(){
        let results = this.$parent.currentQuestion == this.questions.length - 1
        return results ? true : false
      }
    },
    methods: {
      startOver() {
        console.log("this starts over",this.currentQuestion)
        if(this.$parent.currentQuestion > 0 && this.$parent.currentQuestion != 0){
          this.$parent.results = []
           return this.$parent.currentQuestion = 0;
        }
      },
      goBack() {
        console.log("this goes back",this.currentQuestion)
        if(this.$parent.currentQuestion > 0 && this.$parent.currentQuestion != 0){
           return this.$parent.currentQuestion -= 1;
        }
      },
      goForward(){
        console.log("this goes forward",this.currentQuestion)
        if(this.$parent.currentQuestion < this.questions.length && this.$parent.currentQuestion != this.questions.length - 1){
          return this.$parent.currentQuestion += 1;
        }
      },
      saveResults(answer){
        if(answer != {} && answer.constructor === Object){
          this.$parent.results.push(answer);
        }
        this.goForward();
        console.log(this.$parent.results)
      },
      renderResults(){
        this.$parent.currentStage = "results"
        console.log("showing off results", this.$parent.results);
      }
    }
  }
</script>

<style lang="scss" scoped>
.buttons {
  margin: 2rem auto;
  margin-top: 4rem;
  text-align: center;
}
 span {
   border: 1px solid #193966;
   padding: .5rem 1rem;

  @media screen and (min-width: 768px){
    padding: 1rem 2rem;
  }

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