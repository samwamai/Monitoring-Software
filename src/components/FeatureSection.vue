<template>
    <section class="section-features">
      <div class="container">
        <div class="row title">
                <h2 class="heading">Some Of The Things You Can Do</h2>
        </div>
        <div class="row pb-5 pt-5">
          <FeatureCard :features="features" />
        </div>
      </div>
    </section>
  </template>
  <script>
  import FeatureCard from '@/components/FeatureCard.vue';

export default {
    name: 'FeatureSection',
    components: {
        FeatureCard
    },
    data() {
        return {
            features: []
        }
    },
    methods: {
        async fetchFeatures() {
            const res = await fetch(``);
            const data = await res.json();
            return data;
        }
    },
    async created() {
        // this.testimonials = await this.fetchFeatures();
          this.features=[
        {
            id: 1,
            image:'',
            heading: 'Monitor Installed Applications',
            paragraph:'View installed applications, installation history, versions and monitor frequency of usage.',
        },
        {
            id: 2,
            image:'',
            heading: 'Record Phone Calls',
            paragraph:'Live listen and record real phone calls as well as VOIP calls such as Skype, LINE and more on phones.',
        },
        {
            id: 3,
            image:'',
            heading: 'Monitor Social Media',
            paragraph:'Read messages and stickers sent and received on chat apps like Facebook Messenger, LINE and much more.',
        },
        {
            id: 4,
            image:'',
            heading: 'Track Device Locations',
            paragraph:'See a record of all locations the device has been. Export coordinates to your favorite GPS navigation app for birds eye viewing.',
        },
        {
            id: 5,
            image:'',
            heading: 'Track Degital Communications',
            paragraph:'Read the contents of outgoing and incoming webmail and SMS messages.',
        },
        {
            id: 6,
            image:'',
            heading: 'View Media',
            paragraph:'Access and download pictures and videos that were taken by the phone camera.',
        },
        {
            id: 7,
            image:'',
            heading: 'Manage Internet Usage',
            paragraph:'Monitor what sites are being visited, bandwidth, passwords.',
        },
        {
            id: 8,
            image:'',
            heading: 'Listen To Enviroment',
            paragraph:'Take control over the devices microphone and listen in on the environment. ',
        },
        {
            id: 9,
            image:'',
            heading: 'Alerts, Reports, Security',
            paragraph:'Login using 2FA security to access and download data, set keyword and location alerts, download reports and upgrade your software.',
        },
        // {
        //     id: 10,
        //     image:'',
        //     heading: 'Mobile App View',
        //     paragraph:'Free mobile app for Android that allows you to access your monitored data on the move.',
        // },
     ]
    }
}
  </script>
  <style scoped>
  .section-features {
    background-color: #f1ecf8;
  }
  .title .heading {
    color: #113F61;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
}
  </style>
  