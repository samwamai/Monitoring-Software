<template>
    <div class="card nopadding">
        <div class="card-header main ">
            <div class=" row header-bar-panel">
                Dashboard
            </div>
            <div class="row">
                <div class="col-6 d-flex justify-content-start left-bar-panel">   
                </div>
                <div class="col-6 d-flex justify-content-end">
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="container-flex">
                <div class="row">
                   <div class="col-6">
                    <DeviceInfo/>
                   </div>
                   <div class="col-6">
                    <AccountCard/>
                   </div>
                </div>
                <div class="row mt-4">
                   <div class="col-12">
                    <DeviceListCard/>
                   </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
</template>
<script>
 import DeviceListCard from '../components/DeviceListCard.vue' 
 import DeviceInfo from '../components/DeviceInfoCard.vue' 
 import AccountCard from '../components/AccountCard.vue' 

export default {
    name: 'DashboardCard',
    components: {
        DeviceListCard,
        DeviceInfo,
        AccountCard
    }
}
</script>
<style scoped>
.header-bar-panel {
    font-size: 16px;
    font-weight: 600;
    color: #5e5f61;
    padding: 30px 40px 40px 30px;
    text-transform: uppercase;
    text-shadow: 0px 1px 10px #d6d6d6;
}

.nopadding {
    padding: 0 !important;
    margin: 0 !important;
}

.overflow {
    overflow-y: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    height: 400px;
}

.overflow::-webkit-scrollbar {
    display: none;
}
</style>