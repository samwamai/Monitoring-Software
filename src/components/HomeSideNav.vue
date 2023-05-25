<template>
  <div v-show="showPanel" class="container-flex p-2 bg-dark">

    <div class="row">
      <router-link to="/home/dashboard" class="d-flex justify-content-center p-4 text-decoration-none  text-white">
        <span>Monitoring App</span>
      </router-link>
      <hr class="text-white">
    </div>

    <div class="row text-white">

      <ul class="flex-column">
        <li v-on:click="selected = 'dashboard'" v-bind:class="{ 'selected': selected == 'dashboard' }">
          <router-link to="/home/dashboard" class="nav-link">
            <i class="fa fa-tachometer icon-padding"></i>
            Dashboard
          </router-link>
        </li>

        <!-- dropdown list -->
        <li>
          <a class="nav-link dropdown-toggle" v-on:click="showDrop = !showDrop">
            Data
          </a>
          <ul v-if="showDrop" class="flex-column">
            <li v-on:click="selected = 'messages'" v-bind:class="{ 'selected': selected == 'messages' }">
              <router-link to="/home/messages">
                <i class="fa fa-comment icon-padding"></i>
                SMS
              </router-link>
            </li>
            <li v-on:click="selected = 'calllogs'" v-bind:class="{ 'selected': selected == 'calllogs' }">
              <router-link to="/home/calllogs">
                <i class="fa fa-phone icon-padding"></i>
                Call Log
              </router-link>
            </li>
            <li v-on:click="selected = 'contacts'" v-bind:class="{ 'selected': selected == 'contacts' }">
              <router-link to="/home/contacts">
                <i class="fa fa-book icon-padding"></i>
                Contacts
              </router-link>
            </li>
            <li v-on:click="selected = 'callrecordings'" v-bind:class="{ 'selected': selected == 'callrecordings' }">
              <router-link to="/home/callrecords">
                <i class="fa fa-volume-control-phone icon-padding"></i>
                Call Recording
              </router-link>
            </li>
            <li v-on:click="selected = 'installedapps'" v-bind:class="{ 'selected': selected == 'installedapps' }">
              <router-link to="">
                <i class="fa fa-mobile icon-padding"></i>
                Installed Apps
              </router-link>
            </li>
            <li v-on:click="selected = 'locations'" v-bind:class="{ 'selected': selected == 'locations' }">
              <router-link to="">
                <i class="fa fa-map-marker icon-padding"></i>
                Locations
              </router-link>
            </li>
            <li v-on:click="selected = 'photos'" v-bind:class="{ 'selected': selected == 'photos' }">
              <router-link to="">
                <i class="fa fa-camera icon-padding"></i>
                Photos
              </router-link>
            </li>
            <li v-on:click="selected = 'videos'" v-bind:class="{ 'selected': selected == 'videos' }">
              <router-link to="">
                <i class="fa fa-video-camera icon-padding"></i>
                Videos
              </router-link>
            </li>
            <li v-on:click="selected = 'audios'" v-bind:class="{ 'selected': selected == 'audios' }">
              <router-link to="">
                <i class="fa fa-volume-up icon-padding"></i>
                Audio Files
              </router-link>
            </li>
            <li v-on:click="selected = 'recordings'" v-bind:class="{ 'selected': selected == 'recordings' }">
              <router-link to="">
                <i class="fa fa-microphone icon-padding"></i>
                Mic Rocordings
              </router-link>
            </li>
            <li v-on:click="selected = 'networks'" v-bind:class="{ 'selected': selected == 'networks' }">
              <router-link to="">
                <i class="fa fa-sitemap icon-padding"></i>
                Networks
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <hr>
      <div class=" row dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../assets/Sam.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>{{ getUser.username }}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a class="dropdown-item">Settings</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" v-on:click="logOutUser()">Sign out</a></li>
        </ul>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
<script>
export default {
  name: 'SideNav',
  props: {
    slides: Array

  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      showPanel: true,
      showDrop: true,
      selected: undefined
    }
  },
  methods: {
    addClass() {
      const firstChild = document.getElementById('carousel-list').firstElementChild;
      firstChild.classList.add('active');
      const firstChild1 = document.getElementById('carousel-items').firstElementChild;
      firstChild1.classList.add('active')
    },
    openSideNav() {
      this.showPanel = true;
    },
    closeSideNav() {
      this.showPanel = false;
    },
    logOutUser() {
      this.$store.dispatch('logout');
    },
  },
}
</script>
<style scoped>
.bg {
  background-color: rgb(84, 91, 101);
}

ul {
  list-style: none;
}

li a {
  display: block;
  color: #dedede;
  padding: 10px 10px;
  text-decoration: none;
}

li a:hover {
  background-color: rgb(52, 59, 69);
  color: #F9AD20 !important;
  border-right: 2px solid #F9AD20;
}

.selected {
  background-color: rgb(52, 59, 69);
  color: #F9AD20 !important;
  border-right: 2px solid #F9AD20;
}

.icon-padding {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
