<template>

    <section id="section-pricing">

        <div class="container-flex">
            <div class="row gx-2 justify-content-center">
                <div class="col-lg-6 mt-1 mb-1 col-xl-4" id="pricing__plan" v-bind:key="pricing.id"
                    v-for="pricing in pricings">
                    <div class="card mb-2 mb-xl-0">
                        <div class="card-body">
                            <h3 class=" mt-2 text-center" style="color: #2f1a4c;" id="pricing__title">
                                <div class="text-uppercase fw-bold">
                                    <span style="color: #b3b3b3;">{{ pricing.package }}</span>
                                </div>
                                <br><span class="span-title"> {{ pricing.price_title }} <br> </span>
                            </h3>
                            <div id="transition-line" class="mt-3 mb-3 d-flex justify-content-center">
                                <div class="trans-line"></div>
                            </div>
                            <div class="mb-3 text-center" id="pricing__values">
                                <span class="text-muted">$</span>
                                <span class="display-6 fw-bold">{{ pricing.price_amount }}</span>
                                <span class="text-muted">/ mo.</span>
                            </div>
                            <ul class="pricing__list text-center">
                                <li v-bind:key="list" v-for="list in pricing.price_list">{{ list }}</li>
                            </ul>
                            <div class="row mb-3">
                                <div class="col-md-12 text-center">
                                    <a href="/contact" class="btn pricing__signup" role="button"
                                        aria-pressed="true">Signup</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>
<script>
export default {
    name: 'PricingCard',
    props: {
        pricings: Array,
    },
}
</script>
<style scoped>
.card {
    -webkit-box-shadow: 0px 0px 12px 1px rgb(204 204 204);
    -moz-box-shadow: 0px 0px 12px 1px rgba(204, 204, 204, 1);
    box-shadow: 0px 0px 12px 1px rgb(204 204 204);
}

.pricing__list {
    list-style: none;
}

.pricing__list li {
    padding: 3px 0 3px 12%;
    text-align: left;
    line-height: 24px;
    background: url(../assets/checked-pricing.png) no-repeat 0 50%;
}

.trans-line {
    width: 50px;
    height: 5px;
    background: #113F61;
    transition: width 0.5s;
}

.card-body:hover>#transition-line .trans-line {
    width: 300px;
    overflow: hidden;
}

.card:hover {
    border-width: 5px;
}

.pricing__signup {
    padding: 12px 60px;
    margin: 20px 0 0 0;
    font-size: 14px;
    letter-spacing: 0.5px;
    font-weight: 400;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    -webkit-transition: background-color 0.3s ease;
    -moz-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
    background: none;
    color: #113F61;
    border: 2px #113F61 solid;
    align-self: center;
    text-decoration: none;
}
.span-title{
    font-size: 15px;
}
</style>
