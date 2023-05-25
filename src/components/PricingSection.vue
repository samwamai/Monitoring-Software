<template>
    <section class="bg-light py-5 border-bottom">
        <div class="container px-5 my-5">
            <div class="text-center mb-5">
                <h2 class="fw-bolder section__title">Our Pricing</h2>
            </div>
            <PricingCard :pricings="pricings" />
        </div>
    </section>
</template>
<script>
import PricingCard from '@/components/PricingCard.vue';

export default {
    name: 'PricingSection',
    components: {
        PricingCard
    },
    data() {
        return {
            pricings: [],
        }
    },
    methods: {
        async fetchAllPricings() {
            const res = await fetch(`/pricings`);
            const data = await res.json();
            return data
        }
    },
    async created() {
        //this.pricings = await this.fetchAllPricings();
        //this.pricingNotes = await this.fetchAllPricingNotes();

        this.pricings = [
            {
                id: 1,
                plan: 'home',
                package: 'LITE',
                price_title: 'LITE offers an essential set of monitoring features at an unbeatable price. Perfect for those who are on a budget.',
                price_amount: '29',
                price_list: [
                    'Call logs',
                    'Address book',
                    'SMS messages',
                    'Location tracking',
                    'Geo-Fencing',
                    'Browsing activity',
                    'Installed applications',
                    'Photos',
                    'Videos',
                    'Audio files',
                    'Wallpaper images',
                    'Calendar',
                    'Easy to install',
                    'Visibility Option',
                    'Dashboard Alerts',
                    'Send Remote Commands from Web',
                    'SMS Remote Commands*',
                    'Check Device Battery Status',
                    'Remotely uninstall the software*',
                    'Remotely deactivate the software',
                    'Remotely restart device*',
                    'Remotely change software features',
                    'Remote Upgrade',
                    'Renew Anytime',
                    'Run in Hidden Mode',
                    'Stop software from being uninstalled',
                    'Hide Rooting*',
                    'Automatic Remote Updates*',
                    'Free Updates'
                ]
            }, {
                id: 2,
                plan: 'home',
                package: 'PREMIUM',
                price_title: 'Choose PREMIUM for all around monitoring of mobile activities. Gives you more features than any of our competitors.',
                price_amount: '79',
                price_list: [
                    'Plus++',
                    'Facebook Call Logs*',
                    'LINE Call Logs*',
                    'Skype Call Logs*',
                    'Viber Call Logs*',
                    'WhatsApp Call Logs*',
                    'Facebook Messenger',
                    'Snapchat Messages',
                    'Hike Messenger*',
                    'Kik Messenger*',
                    'Instagram Direct Messages',
                    'LINE Messages*',
                    'Skype Messages*',
                    'Viber Messages',
                    'WhatsApp Messages',
                    'Google Messages',
                    'Hangout Messages*',
                    'QQ Messages*',
                    'Telegram Messages*',
                    'Tinder Messages',
                    'WeChat Message*',
                    'Email*',
                    'Gmail',
                    'Application Screenshots*',
                    'SIM Changed Notification'
                ]
            }, {
                id: 3,
                plan: 'home',
                package: 'EXTREME',
                price_title: 'Only for the most demanding detectives, EXTREME adds monitoring and recording of all audio streams and other amazing discovery tools.',
                price_amount: '119',
                price_list: [
                    'plus++',
                    'Phone Call recording',
                    'Phone Call interception*',
                    'Spycall †',
                    'Environment recording',
                    'Facebook Call Recording †',
                    'Hangout Call Recording †',
                    'LINE Call Recording †',
                    'Skype Call Recording †',
                    'Viber Call Recording †',
                    'WhatsApp Call Recording †',
                    'RemCam',
                    'RemVid',
                    'Spoof SMS*',
                    'Call Notification Alert*',
                    'SMS Keyword deletion*'
                ]
            }
        ]

    }
}
</script>
<style scoped>
.section__title {
    font-size: 48px;
    padding: 0 0 40px 0;
    font-weight: 700;
    line-height: 30px;
    color: #113F61;
}

.install_section__title,
.install_section__description {
    color: #113F61;
}

.install_section__description_p {
    color: #005e59;
}

.nav-tabs .nav-link.active {
    background-color: #113F61 !important;
    color: #fff !important;
    border: none;
    border-radius: 25px;
    padding: 15px 50px;
    font-size: 14px;
    z-index: 999;
}

.nav-tabs .nav-link {
    background-color: #F7F8F9;
    border-radius: 25px;
    margin-left: -40px;
    color: #113F61;
    padding-left: 60px !important;
    padding-right: 60px !important;
}
</style>
