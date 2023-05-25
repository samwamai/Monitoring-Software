<template>
    <div class="card nopadding">
        <div class="card-header main ">
            <div class=" row header-bar-panel">
                Device List
            </div>
            <div class="row">
                <div class="col-6 d-flex justify-content-start left-bar-panel">
                    <ul>
                        <li>
                            <a><i class="fa fa-bars" style="color: #5FBB3F"></i>&nbsp;&nbsp;Total {{ totalCount }}</a>
                        </li>
                        <li>
                            <a><i class="fa fa-bars" style="color: #5FBB3F"></i>&nbsp;&nbsp;Online count</a>
                        </li>
                    </ul>
                </div>
                <div class="col-6 d-flex justify-content-end">
                </div>
            </div>
        </div>
        <div class="card-body silver-background">
            <div class="container-flex">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-hover">
                            <thead class="thead-dark">
                                <th class="col th-text">Bind-Name</th>
                                <th class="col th-text">Status</th>
                                <th class="col th-text">Network</th>
                                <th class="col th-text">Device</th>
                                <th class="col th-text">LastSeen</th>
                                <th class="col th-text">Action</th>
                            </thead>
                            <tbody  v-for="device in deviceList" :key="device.id">
                                <td class="td-text">{{ device.bind_name }}</td>
                                <td class="td-text">
                                    <i v-if=" device.connect_mode==1 ">Online</i>
                                    <i v-else-if=" device.connect_mode==2 ">Online</i>
                                    <i v-else>Offline</i>
                                </td>
                                <td class="td-text">
                                    <i v-if=" device.connect_mode==1 " class="fa fa-signal"></i>
                                    <i v-else-if=" device.connect_mode==2 " class="fa fa-wifi"></i>
                                    <i v-else class="fa fa-times"></i>
                                </td>
                                <td class="td-text">{{ device.device }}</td>
                                <td class="td-text">{{ device.last_seen }}</td>
                                <td class="td-text"><span class="span_button">
                        <span class="fa fa-trash"></span>&nbsp; <span>
                            DELETE</span></span></td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
</template>
<script>
export default {
    name: 'DeviceListCard',
    computed: {
      deviceList(){
        return this.$store.state.devices;
      },
      totalCount(){
            if(this.deviceList!==null){
            return this.deviceList.length;}else{return 0;}
        }
    },
    methods: {
        // async deleteDevice(device) {
        //     const res = await fetch(`/`);
        //     const data = await res.json();
        //     return data

        // },
        
    }
}
</script>
<style scoped>
.silver-background{
    background-image: url('../assets/silver.jpg');
}
.header-bar-panel {
    padding: 0px 40px 0px 30px;
    font-size: 14px;
    font-weight: 600;
    color: #777777;
    text-align: left;
    text-shadow: 1px 1px 3px #dedede;
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
.left-bar-panel ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.left-bar-panel ul li {
    float: left;
}

.left-bar-panel ul li a {
    display: inline-block;
    padding: 2px 10px;
    background-color: #f7f9fb;
    text-decoration: none;
    color: #959b9f;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 7px;
    border: 1px solid #fff;
    border-right-color: rgb(255, 255, 255);
    transition: all ease-in-out 0.2s;
}
.th-text{
    font-weight: 500;
    font-size: 13px;
    padding: 0px 0px 0px 5px;
    font-weight: 600;
    color: #777777;
    text-align: left;
    text-shadow: 1px 1px 3px #dedede;
}
.td-text{
    color: #8e8e8e;
    font-weight: 500;
    font-size: 13px;
}
.span_button{
    background-color: hsl(0, 83%, 56%);
    padding: 5px 5px;
    cursor: pointer;
    color: #fff;
    border-radius: 7px; 
    font-size: 0.9em;
    width: 60px;
}
</style>