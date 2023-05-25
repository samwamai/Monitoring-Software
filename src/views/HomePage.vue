<template>
    <div class="home container-flex">
    <div class="row">
    <div class="col-3 nopadding">
      <HomeSideNav/>
    </div>
    <div class="col-9 col-l nopadding">
      <div class="row nopadding">
        <HomeTopNav/>
      </div>
      <div class="row nopadding">
        <router-view></router-view>
      </div>
    </div>
    </div>    
    </div>
</template>

<script>
import HomeSideNav from '../components/HomeSideNav.vue';
import HomeTopNav from '../components/HomeTopNav.vue';
export default {
  name: 'App',
  components: {
    HomeSideNav,
    HomeTopNav,
  }
}
</script>
<style scoped>
.home {
  min-width: 1000px;
  width: 100%; 
}
.nopadding {
   padding: 0 !important;
   margin: 0 !important;
}
</style>
