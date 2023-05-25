<template>
  <div v-if="deviceList == null" class="row text-white p-2 ml-1">
    <span>No Device Available</span>
  </div>
  <div v-if="selectedDevice != null" class="row selected p-2 ml-1">
    <div class="col icon-size list-item">
      <span class="fa fa-android"></span>
    </div>
    <div class="col">
      <div class="row value-size overflow list-item">{{ selectedDevice.bind_name }}</div>
      <div class="row key-size">Bind-name</div>
    </div>
    <div class="col">
      <div class="row value-size overflow list-item">{{ selectedDevice.imei }}</div>
      <div class="row key-size">IMEI</div>
    </div>
    <div class="col">
      <div class="row value-size overflow list-item">
        <i v-if="selectedDevice.connect_mode == 1" class="fa fa-signal">Online</i>
        <i v-else-if="selectedDevice.connect_mode == 2" class="fa fa-wifi">Online</i>
        <span v-else>Offline</span>
      </div>
      <div class="row key-size">Connection</div>
    </div>
    <div class="col">
      <div class="row value-size overflow">{{ selectedDevice.device }}</div>
      <div class="row key-size">Device</div>
    </div>
    <div v-on:click="showList = !showList" class="col icon-size dropdown-right">
      <i class="fa fa-angle-down"></i>
    </div>

    <div v-if="showList">
      <div class="dropdown-content">
        <div v-for="device in deviceList" v-bind:key="device.id" v-on:click="selecteDevice(device), showList = false"
          class="row list p-2">
          <div class="col icon-size list-item">
            <span class="fa fa-android"></span>
          </div>
          <div class="col list-item">
            <div class="row value-size overflow">{{ device.bind_name }}</div>
            <div class="row key-size">Bind-name</div>
          </div>
          <div class="col list-item">
            <div class="row value-size overflow">{{ device.imei }}</div>
            <div class="row key-size">IMEI</div>
          </div>
          <div class="col list-item">
            <div class="row value-size overflow">
              <i v-if="device.connect_mode == 1" class="fa fa-signal">Online</i>
              <i v-else-if="device.connect_mode == 2" class="fa fa-wifi">Online</i>
              <span v-else>Offline</span>
            </div>
            <div class="row key-size">Connection</div>
          </div>
          <div class="col">
            <div class="row value-size overflow">{{ device.device }}</div>
            <div class="row key-size">Device</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DeviceDropdown',
  computed: {
    deviceList() {
      return this.$store.state.devices;
    },
    selectedDevice() {
      return this.$store.state.selectedDevice;
    }
  },
  data() {
    return {
      showList: false,
    }
  },
  methods: {
    selecteDevice(device) {
      this.$store.dispatch('selectedDevice', device);
    },
  }

}
</script>
<style scoped>
.selected {
  background-color: rgb(133, 141, 154);
  color: #5FBB3F
}

.list {
  background-color: rgb(133, 141, 154);
  color: #5FBB3F;
  border-bottom: 1px solid #545B65;
  border-top: 1px solid #545B65;
  cursor: pointer;
  margin-left: 0px;
}

.list-item {
  border-right: 1px solid #545B65;
  /* padding-right: 10px; */
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

.icon-size {
  width: 10px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  /* margin-left: 5px; */
}

.value-size {
  justify-content: center !important;
  word-break: break-all;
  font-size: 11px;
  font-weight: bold;
  color: #EEE;
  text-align: center;
  height: 50px;
  width: 70px;
}

.key-size {
  justify-content: center !important;
  color: #545B65;
  font-size: 11px;
  font-weight: bold;
  height: 10px;
  width: 70px;
}

.dropdown-right {
  cursor: pointer;
  font-size: 25px;
  color: #EEE;
}

.overflow {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow::-webkit-scrollbar {
  display: none;
}


.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* dropdown-list button on hover & focus */
.dropbtn:hover,
.dropbtn:focus {
  background-color: #2980B9;
  display: block
}

/* The container <div> - needed to position the dropdown content */
.dropdown-list {
  position: relative;
  display: inline-block;
}

/* dropdown-list Content (Hidden by Default) */
.dropdown-content {
  display: block;
  position: absolute;
  width: auto;
  margin-top: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 9;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
</style>
