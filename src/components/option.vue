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
      <p class="name">{{ option.type }}</p>
      
      <select name="" id="" v-if="option.sizes" v-model="size">
        <option value="" selected>Select a Size</option>
        <option v-for="(size,index) in option.sizes"  :key="index" :value="size">
          {{ size }}
        </option>
      </select>
      <select name="" id="" v-if="option.colors" v-model="color">
        <option value="" selected>Select a Color</option>
        <option v-for="color in option.colors"  :key="color[index]" :value="color">
          {{ color }}
        </option>
      </select>
      
      <select v-if="option.options" v-model="choice">
        <option value="" selected>Select an Option</option>
        <option v-for="option in filteredOptions" :key="option.id" :value="option.id">
          {{ option["name"] }}
        </option>
      </select >
      <ul v-if="option.reasons" class="reason">
        <li  v-for="reason in option.reasons" :key="reason.id">
          {{ reason["reason_text"] }}
        </li>
      </ul>

      <ul v-if="benefits" class="reason">
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
        color: null,
        size: null,
        choice: null,
        selected: null
      }
    },
    methods: {
      selectionMade(){
        console.log(this.selected)
        this.$parent.$emit('selection-made', { "product_id": this.selected, 'product_text': this.option.text,  "image": this.option.image, "outrigger": this.option.type, "url": this.option.url })
      }
    },
    computed: {
      filteredOptions(){
        let optionData = this.option.options;
        if(this.color) {
          optionData = optionData.filter(option => option.color.toLowerCase() === this.color.toLowerCase())
        }
        if(this.size) {
          optionData = optionData.filter(option => option.size === this.size)
        }
        return optionData;
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

  .reason  {
    color: #ADB2B3;
    
  }
    img {
      width: 100%;
      object-fit: cover;
      object-position: center center;
      height: 50%;
  }
  
  @supports(-webkit-appearance: none) or (-moz-appearance: none) {

    input[type='radio'] {
      --webkit-apperance: none;
      --moz-apperance: none;
      appearance: none;
      cursor: pointer;
      height: 30px;
      width: 30px;
      outline: none;
      border: 4px solid $blue;
      border-radius: 50%;
      background: $white;
      transition: background ease-in-out .3s;
        &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        }
        &:checked {
          border: 4px solid $blue;
          background: $blue;
        }
    }
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
  margin-left: 3.8rem;
  margin-top: .2rem;
}
.name {
  color: #193966; 
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