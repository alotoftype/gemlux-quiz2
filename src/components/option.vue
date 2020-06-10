<template>
  <div class="option_item">
    <img :src="require(`@/assets/images/${option.image}`)" alt="">
    <div class="container">
   <input type="radio" name="option.option-type" id="" value="option.points"> <label for="">{{ option.text }}</label>
   <p>{{ option.type }}</p>
   </div>
   <p class="learn-more"><a :href="option.url" target="_blank">Learn More</a></p>
  </div>
</template>

<script>
  export default {
    name: 'Option',
    props: {
      option: Object
    }
  }
</script>

<style lang="scss" scoped>
  .option_item {
    border: 1px solid #193966;
    width: calc(calc(100% / 3) - 48px);
  }
  img {
    width: 100%;
  }
  input[type="radio"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
}
label {
  color: #193966;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform:uppercase;
}
.learn-more {
  text-align: center;
  padding: 1rem 1.5rem;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  max-width: 50%;
  border: solid #193966;
}
</style>