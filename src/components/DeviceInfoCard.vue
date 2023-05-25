<template>
    <div class="card nopadding">
        <div class="card-header main">
            <div class=" row header-bar-panel">
                Device Info ( Current Selected )
            </div>
        </div>
        <div v-if="deviceInfo" class="card-body silver-background">
            <div class="device-info-block">
                <div class="info-text-block">
                    <div class="info-block">
                        <div class="info-title">Bind Name</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.bind_name }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Device</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.device }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Model </div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.model }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">OS </div>
                        <div class="info-text">: &nbsp;&nbsp;Android</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">IMEI </div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.imei }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Network </div>
                        <div class="info-text">: &nbsp;&nbsp;
                            <span v-if="deviceInfo.connect_mode == 1">Online</span>
                            <span v-else-if="deviceInfo.connect_mode == 2">Online</span>
                            <span v-else>Offline</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Battery </div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.device_charge }}%</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Ring Mode </div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.ring_mode }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Root </div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.root }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Client Status </div>
                        <div class="info-text">: &nbsp;&nbsp;
                            <span v-if="deviceInfo.connect_mode == 1">Online</span>
                            <span v-else-if="deviceInfo.connect_mode == 2">Online</span>
                            <span v-else>Offline</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Bind Date </div>
                        <div class="info-text">: &nbsp;&nbsp;{{ deviceInfo.bind_date }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Synced </div>
                        <div class="info-text">: &nbsp;
                            <span>{{ deviceInfo.last_seen }}</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
</template>
<script>
export default {
    name: 'DeviceInfoCard',
    computed: {
        deviceInfo() {
            return this.$store.state.selectedDevice;
        }
    },
}
</script>
<style scoped>
.silver-background {
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

.device-info-block {
    display: block;
    position: relative;
    float: left;
    height: 260px;
    box-sizing: border-box;
    float: none;
    width: 100%;
    text-align: center;
}

.info-block {
    padding-top: 2px;
    font-size: 13px;
    color: #909090;
    font-weight: 400;
    text-align: left;
}

.info-title {
    float: left;
    color: #8e8e8e;
    font-weight: 500;
    width: 100px;
}

.info-text {
    float: left;
}

.clear {
    clear: both;
}</style>
