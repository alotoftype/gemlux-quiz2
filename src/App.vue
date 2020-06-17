<template>
  <section>

    <transition name="slide-fade" mode="out-in">
      <Intro v-if="isQuizStarted == false" @start="startQuiz"></Intro>
    </transition>
    <Questionaire v-if="isQuizStarted == true && currentStage == 'quiz-started'"
     :questions="questions" 
     :currentQuestion.sync="currentQuestion"
     :results.sync="results"
     ></Questionaire>
    <div v-if="currentStage == 'results'" class="results">
      <h2>Your Selections are:</h2>
      <div class="results_wrapper">
        <div v-for="(result, index) in results" :key="index" class="result_item">
          <a :href="result.url" target="_blank">
          <img :src="require(`@/assets/images/${result.image}`)" alt="">
          </a>
          <a :href="result.url" class="learn-more">Learn More</a>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import Intro from './components/intro';
  import Questionaire from './components/questionaire';
  export default {
    name: "App",
    components: {
      Intro,
      Questionaire,
    },
    data() {
      return {
        baseUrl: process.env.VUE_APP_BASE_URL,
        title: '',
        questions: [],
        currentStage: "introStage",
        isQuizStarted: false,
        currentQuestion: 0,
        results:[],
        score: 0,
        perc: null
      } 
    },
    created(){
      this.fetchData()
    },
    methods: {
        fetchData(){
          axios.get('data.json').then(response => {
            this.title = response.data.title
            this.questions = response.data.questions
          })
        },
        startQuiz(){
          this.isQuizStarted = true;
          this.currentStage = 'quiz-started';
          console.log('start the quiz')
        }
      }
  }
</script>

<style lang="scss" scoped>
 div {
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 }
 .results {
    text-align: center;
    img {
      width:100%;
      object-fit: cover;
      object-position: center center;
      height: 60%;
    }
 }

 img {
   width: 100%;
 }

 .results_wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   flex-wrap: wrap;

   @media screen and (min-width: 768px){
     flex-direction: row;
     align-items: initial;
     justify-content: space-around;
   }
 }
 .result_item{
   width: calc(100% / 3);
 }
</style>