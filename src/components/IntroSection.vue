<template>
    <section class="section section--features" id="why-TSN">
        <div class="container-flex">
            <div class="row mb-5">
                <div class="col-md-5 p">
                    <h2>{{ whyus.title }}</h2>
                    <ul class="mt-3 mb-5">
                        <li v-bind:key="li" v-for="li in whyus.list">
                            {{ li }}
                        </li>
                    </ul>
                    <a href="#" class="btn btn--white-bg">View Demo</a>
                    <a href="#" class="btn btn--white-bg">Buy Now</a>
                </div>
                <div class="col-md-7">
                    <div class="text-center">
                        <!-- <img src="../assets/kenya.svg" class="img img-fluid "> -->
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>
<script>

export default {
    name: 'IntroSection',

    data() {
        return {
            whyus: Object
        }
    },
    methods: {
        async fetchWhyus() {
            const res = await fetch(`/whyus`);
            const data = await res.json();
            return data
        }
    },
    async created() {
        //this.whyus = await this.fetchWhyus()

        this.whyus = {
            title: "Monitoring Software for Android Mobile Phones and Tablets.",
            list: [
                "Monitor all Android digital and audio communications.",
                "Parental Control Software gives parents the peace of mind that their children are safe.",
                "Employee Monitoring. know everything that happens on your company devices.",
                "Direct Device Delivery service monitor.",
                "know everything, no matter where you are.",
                "Captures all forms of messaging, records and intercepts all types of calls, is 100% hidden, logs keystrokes — and much more."
            ]
        }
    }
}
</script>
<style scoped>
#why-TSN {
    background-image: url(../assets/message.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #9167cb;
    background-blend-mode: multiply;
}

.section {
    width: 100%;
    height: auto;
    float: left;
    clear: both;
}

#why-TSN h2 {
    color: #fff;
    font-weight: 700;
    letter-spacing: -0.5px;
    padding: 0 0 40px 0;
    margin: 0;
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
}

.row {
    padding-top: 100px;
    padding-left: 25px;
    padding-right: 25px;
}

#why-TSN ul li {
    color: #fff;
    background: url(../assets/check.png) no-repeat left top;
    padding-left: 60px;
    margin-bottom: 15px;
}

#why-TSN ul {
    list-style: none;
}

.btn--white-bg {
    color: #fff;
    background-color: transparent;
    border: 2px #fff solid;
    font-weight: bolder;
    border-radius: 25px;
    padding: 10px 30px;
    margin: 0 5px;
}
</style>
