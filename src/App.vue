<template>
  <main>
    <nav class="nav">

      <li><a href="https://gemlux.com" target="_blank"><img :src="require(`@/assets/images/GEMLUX_Main_Logo_White.svg`)" class="logo" alt="Logo Image"></a></li>
    </nav>
  <section class="container">
    <transition name="slide-fade" mode="out-in">
      <Intro v-if="isQuizStarted == false" @start="startQuiz"></Intro>
    </transition>
    <Questionaire v-if="isQuizStarted == true && currentStage == 'quiz-started'"
     :questions="questions" 
     :previousQuestion.sync="previousQuestion"
     :currentQuestion.sync="currentQuestion"
     :results.sync="results"
     ></Questionaire>
    <div v-if="currentStage == 'results'" class="results">
      <div class="results__button">
        <a href="/">Start Over</a>
        <a :href="addToCartUrl()" target="_blank" class="active">Add to Cart</a>
      </div>
      <div class="results_wrapper">
        <div v-for="(result, index) in results.filter( result => result.image != '')" :key="index" class="result_item">
          <div class="results_item__img">
          <a :href="result.url" target="_blank">
          <img :src="require(`@/assets/images/${result.image}`)" alt="">
          </a>
          </div>
          <div class="results_item__content">
          <h2>{{result.product_text}}</h2>
          <a :href="result.url || ''" class="learn-more">Learn More</a>
          </div>
        </div>
      </div>
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
        previousQuestion: 0,
        results:[],
        score: 0,
        perc: null,
        resultUrl: ''
      } 
    },
    created(){
      this.fetchData()
    },
    computed: {
      
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
          function createdUrl(arr){
            let url = ' http://gemlux.com/app/site/query/additemtocart.nl?c=1019389&n=3&buyid=multi&multi='
            let string = "";
            let combinedUrl = "";
            let len = arr.length - 1;
            arr.forEach(function(item, index){
              if(index===(len-1)) {
                console.log('last one');
              }
            if (item.product_id !== '' && item.product_id !== null && item.product_id !== undefined) {
              string += `${item.product_id},1;`;
            }
            })
            console.log('string:', string);

            combinedUrl = url + string;
            console.log(combinedUrl)
            return combinedUrl;
          }
          if(this.results && this.results.length != 0) {
            return createdUrl(this.results)
          } else {
            return 'https://www.gemlux.com/cart'
          }
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


 main {
   margin: 0;
   padding: 0;
 }
 .nav {
   background-color: $blue;
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
.container {
  width: 90%;
  max-width: 1280px;
  margin: 1rem auto;

  @media screen and (min-width: 768px) {
    width: 100%;
  }
}
 .results_wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   flex-wrap: wrap;

   @media screen and (min-width: 768px){
     flex-direction: column;
     align-items: initial;
     justify-content: space-around;
   }
 }
 .result_item{
   border: 3px solid $blue;
  width: 100%;
   display: flex;
   align-items: center;
   text-align: left;
        margin: 1rem auto;

   @media screen and (min-width: 768px) {
     width: 100%;
     margin: 1rem;
     margin-top: .5rem;
   }

   img {
     width: 100%;
     object-fit: cover;
   }
 }

 .results_item__img {
   width: 20%;

   img {
     width: 100%;
   }
 }

 .results_item__content {
   margin: 1rem;

   h2 {
     text-transform: uppercase;
     font-weight: lighter;
   }
 }
 .results__button {
   width: 100%;
   display: flex;
   margin: 1rem auto;
   margin-bottom: .2rem;
   justify-content: space-between;

   @media screen and (min-width: 768px) {
     margin: 1rem;
     margin-bottom: 0;
   }

   a {
     border: 1px solid $blue;
     text-transform: uppercase;
     padding: 1rem 2rem;
     
   }

   .active {
     background-color: $blue;
     color: #fff;
   }
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
  background-color: $blue;
}
</style>