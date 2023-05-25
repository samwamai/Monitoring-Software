<template>
  <div v-bind:key="feature.id" v-for="feature in features" class="col-md-4 text-center">
    <div class="card-item">
      <div class="grid__icon">
        <img src="../assets/Utra_fast_icon.svg" alt="Ultra fast Speeds" width="100" height="100">
      </div>
      <h5 class="grid_heading">
        <span>{{ feature.heading }}</span>
      </h5>
      <p class="grid_paragraph">{{ feature.paragraph }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureCard',
  props: {
    features: Array,
  }
}
</script>
<style scoped>
.card-item {
  -webkit-box-shadow: 0px 0px 12px 1px rgb(204 204 204);
  -moz-box-shadow: 0px 0px 12px 1px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 12px 1px rgb(204 204 204);
  border-radius: 5%;

}

.grid_heading {
  font-size: 15px;
}

.grid_paragraph {
  color: #666;
  font-size: 13px;
}
</style>
