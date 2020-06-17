<template>
  <div class="intro" :style="{ backgroundImage: 'url(' + require('@/assets/VUeThRRw.jpeg') + ')' }">
    <div class="intro_content">
      <h3>Build Your</h3>
      <p>OutRigger System</p>
      <Button @button-clicked="start" class="start-quiz"></Button>
    </div>
  </div>
</template>

<script>
  import Button from './button';
  export default {
    name: "Intro",
    data() {
      return {
        message: "Build Your Outrigger System",
      }
    },
    components: {
      Button
    },
    methods: {
      start(){
        this.$emit('start')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .intro {
    width: 100%;
    height: 600px;
    display: flex;
    background-size: 100%;
    background-position: left center;
    background-repeat: no-repeat;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    position: relative;


  }
  .intro_content{
    //border: 1px solid blue;
    width: 30%;
    height: 50%;
    text-align: center;
    position: absolute;

        h3 {
      font-size: 3rem;
      margin-bottom: 0;
    }
    p {
      font-size: 4rem;
      font-weight: 200;
      margin: 0;
    }

    .start-quiz {
      padding: 1rem 1.5rem;
      font-size: 1.9rem;
      font-weight: bold;
      text-transform: uppercase;

    }
  }
</style>