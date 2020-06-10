<template>
  <div>

    <transition name="slide-fade" mode="out-in">
      <Intro v-if="isQuizStarted == false" @start="startQuiz"></Intro>
    </transition>
    <Questionaire v-if="isQuizStarted == true" :questions="questions" :currentQuestion.sync="currentQuestion"></Questionaire>

  </div>
</template>

<script>
  import axios from 'axios';
  import Intro from './components/intro';
  import Questionaire from './components/questionaire';
  export default {
    name: "App",
    components: {
      Intro,
      Questionaire
    },
    data() {
      return {
        
        baseUrl: process.env.VUE_APP_BASE_URL,
        title: '',
        questions: [],
        currentStage: "introStage",
        isQuizStarted: false,
        currentQuestion: 0,
        answers:[],
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
          console.log('start the quiz')
        }
      }
  }
</script>

<style lang="scss" scoped>
 div {
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 }
</style>