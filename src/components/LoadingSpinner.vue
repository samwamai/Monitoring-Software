<template>
<div v-if="background" class="blur-background"></div>
<div v-if="loader" class="lds-ripple">
  <div></div>
  <div></div>
</div>
</template>
<script>
export default {
    name: 'LoadingSpinner',
    data() {
        return{
          background:false,
          loader:false
        }
    },
    methods:{
      dismissLoader(){
       this.background = false;
       this.loader = false;
      },
      showLoader() {
      this.background=true;
      this.loader = true;
      setTimeout(this.dismissToast, 6000);
}
    }
}
</script>
<style scoped>
div.blur-background {
    position: fixed;
    z-index: 8011;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

</style>