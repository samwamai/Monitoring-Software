<template>
    <section class="pt-5 pb-5" id="testimonials">
        <div class="container-flex">
            <div class="row title">
                <h2 class="heading">What Our Customers Are Saying</h2>
            </div>
            <div class="row">
                <TestimonialCard :testimonials="testimonials" />
            </div>
        </div>
    </section>
</template>
<script>
import TestimonialCard from '@/components/TestimonialCard.vue';

export default {
    name: 'TestimonialSection',
    components: {
        TestimonialCard
    },
    data() {
        return {
            testimonials: []
        }
    },
    methods: {
        async fetchTestimonials() {
            const res = await fetch(``);
            const data = await res.json();
            return data;
        }
    },
    async created() {
        // this.testimonials = await this.fetchTestimonials();
          this.testimonials=[
        {
            id: 1,
            name: 'James',
            body:'The customer service is very efficient and always ready to answer all the questions and this was my motivation in the first place to subscribe. ',
        },{
            id: 2,
            name: 'Michael',
            body:'I have a business and need to keep track of my trucks. The best feature for me is definitely the GPS. It shows the location and is constantly updating to new locations, making it easy to track my employees. I would definitely recommend using this product if you are trying to keep track of someone or something!',
        },{
            id: 3,
            name: 'Evalyne',
            body:'I used this to monitor my son to see if he was going anywhere before or after school as I just wanted to make sure he wasnt going anywhere I disapproved of. I was able to do this quite easily using the GPS tracker and I was quite impressed with the accuracy of the locations. ',
        }
     ]
    }
}
</script>
<style scoped>
#testimonials {
    min-height: 100px;
}
.title .heading {
    color: #113F61;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>
