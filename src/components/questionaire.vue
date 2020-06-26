<template>
  <div class="quiz">
    <Question
      :key="questions[currentQuestion].index"
      :question="questions[currentQuestion]"
      :currentQuestion="currentQuestion"
      @selection-made="saveResults"
    ></Question>
    <div class="buttons">
      <!-- <span @click="startOver" v-show="currentQuestion > 0">Start Over</span> -->
      <span @click="goBack" v-show="currentQuestion > 0" class="g-back">Go Back</span>
      <span @click="goForward" v-show="currentQuestion < questions.length && !this.displayResults">keep going</span>
      <span @click="renderResults" v-show="this.displayResults">View your Packages</span>
    </div>
  </div>
</template>

<script>
  import Question from './question';
  export default {
    name: 'Questionaire',
    data(){
      return {
        displayResults: false
      }
    },
    props: {
      questions: Array,
      currentQuestion: Number,
      results: Array
    },
    components: {
      Question
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
          this.$parent.results.pop()
          if(this.results[0].outrigger == 'costal base'){
           return this.$parent.currentQuestion -= 2;
          } else {
            return this.$parent.currentQuestion -= 1;
          }
        }
      },
      goForward(){
        console.log("this goes forward",this.currentQuestion)
        if(this.$parent.currentQuestion < this.questions.length && this.$parent.currentQuestion != this.questions.length - 1){
            return this.$parent.currentQuestion += 1;
          
        }
      },
      showResults(){
        if( this.currentQuestion == this.questions.length - 1 && this.questions.length == this.$parent.results.length) {
          return this.displayResults = true
        }
        else {
          return this.displayResults = false
        }
      },
      saveResults(answer){
        if(answer != {} && answer.constructor === Object){
          this.$parent.results[this.currentQuestion] = answer;
        }
        this.showResults()
        console.log(this.$parent.results)
      },
      renderResults(){
        this.$parent.currentStage = "results"
        console.log("showing off results", this.$parent.results);
        console.log("showubg results url", this.$parent.resultUrl)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.buttons {
  margin: 2rem auto;
  padding: 0 1rem;
  margin-top: 4rem;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
}
 span {
   display: block;
   border: 1px solid $blue;
   background-color: #193966;
   color: #fff;
   padding: .5rem 1rem;

  @media screen and (min-width: 768px){
    padding: 1rem 2rem;
  }

  &:hover {
    color: #193966;
    background-color: #fff;
  }
 }
 .active {
  color: #fff;
  background-color: #193966; 
 }
 .g-back {
   color: #193966;
   background-color: #fff;

  &:hover {
    color: #fff;
    background-color: #193966;
  }
 }
</style>