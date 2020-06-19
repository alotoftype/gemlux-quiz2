<template>
  <div class="option_item">
    <img :src="require(`@/assets/images/${option.image}`)" alt="">
    <div class="container">
      <div class="form-group">
        <input type="radio" 
        :name="option.option" 
        :id="option.product_id" 
        :value="option.product_id" 
        v-model="selected"
        :required="!selected"
        @change="selectionMade"
        > 
        <label :for="option.product_id">{{ option.text }}</label>
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
        this.$parent.$emit('selection-made', { "product_id": this.selected, "image": this.option.image, "outrigger": this.option.type, "url": this.option.url })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .option_item {
    border: 5px solid #193966;
    width: 100%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (min-width: 768px) {
          width: calc(calc(100% / 3) - 48px);
    }


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
    width: 20%;
    height: 2rem;
    padding: 0;
}
.form-group {
  display: flex;
  align-items: center;
}
label {
  color: #193966;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform:uppercase;
  //display: block;
}
p {
  text-transform: uppercase;
  margin-left: 1rem;
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