<template>
  <section id="slider-testimonial">
    <div class="container-flex slider">
      <!-- Carousel wrapper -->
      <div id="carouselTestimonials" class="carousel slide carousel-dark text-center" data-mdb-ride="carousel">
        <!-- Controls -->
        <div class="d-flex mb-4">
          <a class="carousel-control-prev" href="#carouselTestimonials" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only"></span>
          </a>
          <a class="carousel-control-next" href="#carouselTestimonials" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only"></span>
          </a>
          <ol class="carousel-indicators pt-5" id="testimonials-carousel-list">
            <li data-target="#carouselTestimonials" v-bind:data-slide-to="index"
              v-for="(testimonial, index) in testimonials" :key="index" class=""></li>
          </ol>
        </div>
        <!-- Inner -->
        <div class="carousel-inner py-4 justify-content-center " id="testimonials-carousel-items">
          <!-- Single item -->
          <div class="carousel-item" v-bind:key="testimonial.id" v-for="testimonial in testimonials">
            <div class="container">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-4">
                  <img class="rounded-circle shadow-1-strong mb-4" src="../assets/left-quote.png" alt="avatar"
                    style="width: 150px;" />
                  <h5 class="mb-3">{{ testimonial.name }}</h5>
                  <p>Connected</p>
                  <p class="text-muted">
                    <i class="fas fa-quote-left pe-2"></i>
                    {{ testimonial.body }}
                  </p>
                  <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li><i class="fas fa-star fa-sm"></i>*</li>
                    <li><i class="fas fa-star fa-sm"></i>*</li>
                    <li><i class="fas fa-star fa-sm"></i>*</li>
                    <li><i class="fas fa-star fa-sm"></i>*</li>
                    <li><i class="fas fa-star fa-sm"></i>*</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- Inner -->
      </div>
      <!-- Carousel wrapper -->
    </div>

  </section>

</template>
<script>
export default {
  name: 'TestimonialCard',
  props: {
    testimonials: Array,
  },
  mounted() {
    setTimeout(() => {
      this.addClass();

    }, 1000);
  },
  methods: {
    addClass() {
      const firstChildtestimonials = document.getElementById('testimonials-carousel-list').firstElementChild;
      firstChildtestimonials.classList.add('active');
      const firstChild1testimonials = document.getElementById('testimonials-carousel-items').firstElementChild;
      firstChild1testimonials.classList.add('active');
    },
  },
}
</script>
<style scoped>
#slider-testimonial .carousel-indicators li {
  display: inline-block;
  width: 30px;
  height: 10px;
  margin: 1px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #f1ecf8;
  border: 1px solid #fff;
  border-radius: 10px;
}
#slider-testimonial .carousel-indicators .active {
  opacity: 1;
  background-color: #113F61;
}
</style>
