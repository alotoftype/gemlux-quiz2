<template>
  <div class="option_item">
    <img :src="require(`@/assets/images/${option.image}`)" alt="">
    <div class="container">
      <div class="form-group">
        <input type="radio" name="variant_id" :id="option.variant_id" :value="option.variant_id" v-model="selected"
          :required="!selected" @change="selectionMade">
        <label :for="option.variant_id">{{ option.text }}</label>
      </div>
      <p class="name">{{ option.type }}</p>
      <div v-if="option.sizes" class="form-group column left spacer">
        <label class="regular" for="size-select">Outrigger Length:</label>
        <select name="" id="size-select" v-model="size" required aria-required="true" @change="selectionMade">
          <option value="" selected>Select a Size</option>
          <option v-for="(size, index) in option.sizes" :key="index" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
      <div v-if="option.colors" class="form-group column left spacer">
        <label class="regular" for="color-select">Outrigger Color</label>
        <select name="" id="color-select" v-model="color" required aria-required="true" @change="selectionMade">
          <option value="" selected>Select a Color</option>
          <option v-for="(color, index) in option.colors" :key="index" :value="color">
            {{ color }}
          </option>
        </select>
      </div>
      <div v-if="option.names" class="form-group column left spacer">
        <label class="regular" for="adapter-select">Outrigger Options</label>
        <select id="adapter-select" v-model="name" required aria-required="true" @change="selectionMade">
          <option value="" selected>Select a Base Adapter</option>
          <option v-for="(name, index) in option.names" :key="index" :value="name">
            {{ name }}
          </option>
        </select>
      </div>
      <ul v-if="option.reasons" class="reason">
        <li v-for="reason in option.reasons" :key="reason.id">
          {{ reason["reason_text"] }}
        </li>
      </ul>

      <ul v-if="benefits" class="reason">
        <li v-for="benefit in benefits" :key="benefit.index">
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
  data() {
    return {
      color: null,
      size: null,
      name: null,
      selected: null
    }
  },
  methods: {
    selectionMade() {
      this.$parent.$emit('selection-made', { "variant_id": this.selectedVariantId, 'product_text': this.option.text, "image": this.option.image, "outrigger": this.option.type, "url": this.option.url });
      return this.selected;
    }
  },
  computed: {
    selectedVariantId() {
      if (!this.option.options) return this.selected;
      let optionData = this.option.options;
      if (this.color) {
        optionData = optionData.filter(option => option.color.toLowerCase() === this.color.toLowerCase())
      }
      if (this.size) {
        optionData = optionData.filter(option => option.size === this.size)
      }
      if (this.name) {
        optionData = optionData.filter(option => option.name === this.name)
      }
      return optionData.length === 1 ? optionData[0].variant_id : null;
    }
  }
}
</script>

<style lang="scss" scoped>

  .option_item {
    border: 5px solid #193966;
    width: 100%;
    height: 100%;
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
.column {
  flex-direction: column;
}
.left{  
  align-items: flex-start;
}
.spacer{
  margin: .5rem 1rem;
}
select {
  width: 100%;
  padding: .5rem 1rem;

&:focus:required:invalid,
&:required {border: 2px solid red;}

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
.regular {
  font-size: initial;
}
.name {
  color: #193966; 
}
.learn-more {
  color: #fff; 
  text-align: center;
  padding: 1rem 1.5rem;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  max-width: 50%;
  border: solid #193966;
  background-color:#193966; 
  
  &:hover {
    background-color: #fff;
    color: #193966;
  }

  a {
    color: inherit;
    text-decoration: none;
    
  &:hover {
    color: #193966;
  }
  }
}
</style>