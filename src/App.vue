<template>
  <main>
    <nav class="nav">

      <li><img :src="require(`@/assets/images/GEMLUX_Main_Logo_White.svg`)" class="logo" alt="Logo Image"></li>
    </nav>
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
              <a href="" @click="resultsToCart">Purchase items now</a>
    </div>
  </section>
  </main>
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
        perc: null,
        resultUrl: ''
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
        },
        addToCartUrl(){
          let url = 'http://shopping.na3.netsuite.com/app/site/query/additemtocart.nl?c=1019389&n=3&buyid='
          let string = '';
          let buyidcount='';

          this.results.forEach(function(item){
 
            if(item !== this.results[this.results.length-1]){
              buyidcount += `multi&`;
            } else {
              buyidcount += `multi`;
            }
            if(item.product_id != '' && item.product_id !== null && item.product_id !== undefined){
              string += `${item.product_id},1;`;
            }
          })
          this.resultUrl = url + buyidcount + string;
        },
        resultsToCart(){
          if(this.results && this.results.length != 0) {
              window.open(this.resultUrl, '_blank')
          }else{
            window.open('https://www.gemlux.com/cart', '_blank');
          }
        }
      }
  }
</script>

<style lang="scss" scoped>

 div {
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 }
 main {
   margin: 0;
   padding: 0;
 }
 .nav {
   background-color: #193A66;
   li {
     list-style-type: none;
   }
   display: flex;
   justify-content: center;
 }
 .logo {
   margin: 1rem auto;
   max-width: 250px;
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

 .header .header__body.sticky {
        position: fixed !important;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 100;
        border-top: 0;
    }
.nav .dropdown .articles, .nav .pickup-in-store-dropdown .articles {
    padding-left: 6rem;
}
.header-menu-secondary-nav.nav >
.articles--teritary {
    display: flex;
    margin: unset;
}
.btn-modified {
  color: #ffffff;
  background-color: #193a66;
}
</style>