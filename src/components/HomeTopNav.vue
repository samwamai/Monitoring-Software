<template>
  <nav class="navbar navbar-dark bg-dark nopadding">
    <ul>
      <li>
        <DeviceDropdown />
      </li>
      <li>
        <div class="date">
          {{ getDate() }}
        </div>
      </li>
      <li>
        <i class="fa fa-bell faa-ring animated" style="color:White;font-size:1.5em;"></i>
      </li>
      <li class="logout">
        <div v-on:click="logOutUser()">
          <a><i class="fa fa-power-off"></i><span>&nbsp;&nbsp;Logout</span></a>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import DeviceDropdown from './DeviceDropdown.vue';
import api from '../axioApi';
export default {
  name: 'HomeTopNav',
  components: {
    DeviceDropdown
  },
  data() {
    return { interval: null };
  },
  computed: {
    devices() {
      return this.$store.state.devices;
    },
    selectedDevice() {
      return this.$store.state.selectedDevice;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logOutUser() {
      this.$store.dispatch('logout');
    },
    getDate() {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      let daySuffix;
      if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
      } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
      } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
      } else {
        daySuffix = 'th';
      }
      const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
      return formattedDate;
    },
    repeatFunction() {
      if (this.isLoggedIn) {
        this.fetchDevices();
      } else if (this.interval !== null) {
        clearInterval(this.interval);
      }
    },
    updateSelected() {
      if (this.selectedDevice === null) {
        this.$store.dispatch('selectedDevice', this.devices[0]);
      } else {
        const filterSectedFromFechedUpdate = this.devices.filter((device) => device.id === this.selectedDevice.id)[0];
        this.$store.dispatch('selectedDevice', filterSectedFromFechedUpdate);
      }
    },
    async fetchDevices() {
      api.axioWithToken.get('/devices/device-info').then((response) => {
        if (response.status === 200) {
          if(JSON.stringify(this.devices)!== JSON.stringify(response.data)){
          this.$store.dispatch('devices', response.data);
          this.updateSelected(); 
          }    
        }
      },
      ).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
    }

  },
  created() {
    this.fetchDevices();
    this.interval = setInterval(this.repeatFunction, 6000);
  },
  unmounted() {
    console.log('unmounted');
  }
}
</script>
<style scoped>
nav {
  display: inline;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li div.date {
  position: absolute;
  right: 200px;
  font-size: 14px;
  font-weight: 400;
  height: 100%;
  vertical-align: top;
  line-height: 50px;
  color: #fff;
}

li i.faa-ring {
  position: absolute;
  right: 150px;
  line-height: 50px;
  color: #fff;
}

li i.faa-ring:hover {
  cursor: pointer;
}

li.logout {
  position: relative;
  float: right;
  line-height: 70px;
  font-size: 15px;
  font-weight: 400;
  height: 75px;
  cursor: pointer;
  background-color: #343B45;
  padding: 0 25px;
}

li.logout a {
  color: #E33C09;
  text-decoration: none;
  display: block;
  text-align: left;
}

li.logout a:hover {
  color: #e33c098a;
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}</style>
