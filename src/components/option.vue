<template>
  <div class="option_item">
    <img :src="require(`@/assets/images/${option.image}`)" alt="">
    <div class="container">
      <div class="form-group">
        <input type="radio" 
        :name="option.option" 
        id="" 
        :value="option.product_id" 
        v-model="selected"
        @change="selectionMade"
        > 
        <label for="">{{ option.text }}</label>
      </div>
      <p>{{ option.type }}</p>
      
      <ul v-if="option.reasons">
        <li  v-for="reason in option.reasons" :key="reason.id">
          {{ reason["reason_text"] }}
        </li>
      </ul>
      <ul v-if="benefits">
        <li  v-for="benefit in benefits" :key="benefit.index">
          {{ benefit }}
        </li>
      </ul>
      
    </div>
    
   <p class="learn-more"><a :href="option.url" target="_blank">Learn More</a></p>
  </div>
</template>

<script>
  export default {
    name: 'Option',
    props: {
      option: Object,
      benefits: Array
    },
    data(){
      return {
        selected: null
      }
    },
    methods: {
      selectionMade(){
        console.log(this.selected)
        this.$parent.$emit('selection-made', { "product_id": this.selected, "outrigger": this.option.type})
      }
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
    // object-fit: cover;
    // object-position: center center;
    // height: 80%;
  }
  
  input[type="radio"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 0px;
    width: 100%;
    height: 2rem;
    padding: 0;
}
.form-group {
  text-align: center;
}
label {
  color: #193966;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform:uppercase;
  display: block;
}
p {
  text-align: center;
  text-transform: uppercase;
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