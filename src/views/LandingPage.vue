<template>
      <div id="landing-page">
      <HeaderSection/>
      <IntroSection/>
      <FeatureSection/>
      <TestimonialSection/>
      <PricingSection/>
      <PaymentSection/>
      <ChatBox/>
      <FooterSection/>
      </div>      
</template>
<script>
import FooterSection from '../components/FooterSection';
import HeaderSection from '../components/HeaderSection.vue';
import ChatBox from '../components/ChatBox.vue';
import PaymentSection from '../components/PaymentSection.vue';
import TestimonialSection from '../components/TestimonialSection.vue';
import FeatureSection from '../components/FeatureSection.vue';
import IntroSection from '../components/IntroSection.vue';
import PricingSection from '../components/PricingSection.vue'
export default {
  name: 'App',
  components: {
    FooterSection,
    ChatBox,
    HeaderSection,
    PaymentSection,
    TestimonialSection,
    FeatureSection,
    IntroSection,
    PricingSection
  }
}
</script>
<style scoped>
#landing-page{
    overflow: hidden;
}
</style>
