<template>
  <ToastNotification ref="toast" />
  <div class="card nopadding">
    <div class="card-header">
      <div class="row header-bar-panel">
        SMS Messages
      </div>
      <div class="row">
        <div class="col-6 d-flex justify-content-start left-bar-panel">
          <ul>
            <li>
              <a v-on:click="sortMessageThreadAll"><i class="fa fa-bars" style="color: #5FBB3F"></i>&nbsp;&nbsp;Search
                All</a>
            </li>
            <li>
              <a><i class="fa fa-bars" style="color: #5FBB3F"></i>&nbsp;&nbsp;Total {{ MessagesList.length }}</a>
            </li>
            <li>
              <a>{{ selectedDevice.bind_name }}</a>
            </li>
          </ul>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <SearchButton :text="'Search.. SMS Keywords'" @submit-search="searchKeyWords" />
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row nopadding">
        <div class="container-flex d-flex justify-content-center">
          <div class="contact-box overflow col-2 pt-4 ">
            <ul v-for="[contact, items] in groupedList" :key="contact" class="names">
              <li @mouseover="hoverd = contact" @mouseleave="hoverd = undefined"
                v-on:click="itemListClicked(contact, items)" v-bind:class="{ 'active': selected == contact }">
                <span id="colorize" ref="toColorItems" class="img-icon-block">{{ getFirstLetter(contact) }}</span>
                {{ contact }}
                <label v-if="hoverd != contact" class="group-counter">{{ items.length }}</label>
                <span v-if="hoverd == contact" v-on:click="nameListDeleteClick()" class="fa fa-trash-o trashcan">
                </span>
              </li>
            </ul>
          </div>
          <div class="col-8 thread overflow">
            <MessageThread :messageThread="messageThread" />
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>
<script>
import MessageThread from './MessageThread.vue';
import SearchButton from './SearchButton.vue';
import api from '../axioApi';
export default {
  name: 'MessageCard',
  components: {
    MessageThread,
    SearchButton
  },
  computed: {
    selectedDevice() {
      return this.$store.state.selectedDevice;
    }
  },
  watch: {
    selectedDevice(newValue, oldValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.messageThreadOld = [],
          this.messageThread = [],
          this.MessagesList = [],
          this.groupedList = [],
          this.fetchMessages();
      }
    },
  },
  data() {
    return {
      messageThreadOld: [],
      messageThread: [],
      MessagesList: [],
      groupedList: [],
      hoverd: undefined,
      showLink: false,
    }
  },
  methods: {
    async fetchMessages() {
      api.axioWithToken.get(`/messages/deviceid/${this.selectedDevice.device_unique_id}`)
        .then((response) => {
          if (response.status === 200) {
            this.MessagesList = response.data;
            this.sortByAddress();
          }
        },
        ).catch((error) => {
          if (error.response && error.response.status == 400) {
            this.toastAny(error.response.data);
          }
        });
    },
    toastAny(message) {
      this.$refs.toast.showToast(message);
    },
    itemListClicked(id, items) {
      this.selected = id;
      this.messageThread = items;
      this.messageThreadOld = this.messageThread
    },
    nameListDeleteClick() {
      alert('nane clicked');
    },
    searchKeyWords(word) {
      if (word.length > 0) { this.showLink = true }
      this.messageThread = this.messageThreadOld;
      this.messageThread = this.messageThread.filter((message) => message.message.toLowerCase().includes(word.toLowerCase()))
    },
    sortMessageThreadAll() {
      this.itemListClicked('0', this.MessagesList)
      this.showLink = false
    },
    sortByAddress() {
      this.messageThreadOld = this.MessagesList
      this.groupedList = this.groupBy(this.MessagesList, Messages => Messages.contact);
      const firstElement = this.groupedList.entries().next().value;
      this.itemListClicked(firstElement[0], firstElement[1])
    },
    getFirstLetter(word) { return word.charAt(0) },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },

    colorize(elements) {
      console.log(elements)
      if (!elements) {
        const colors = ["#d63384", "#fd7e14", "#ffc107", "#198754", "#20c997", "#0dcaf0",
          "#0d6efd", "#198754", "#0dcaf0", "#ffc107", "#b493e8"];
        elements.forEach((element) => {
          let pickedColor = colors[Math.floor(Math.random() * colors.length)];
          element.style.backgroundColor = pickedColor;
        });
      }
    }

  },
  async mounted() {
    await this.$nextTick();
    // this.colorize(this.$refs.toColorItems);
  },
  async created() {
    this.fetchMessages();
  }
}
</script>
<style scoped>
.trashcan {
  position: absolute;
  display: block;
  right: 10px;
  top: 10px;
  height: 22px;
  min-width: 25px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  color: red;
  line-height: 24px;
  border-radius: 15px;
  font-weight: 500;
  font-size: 19px;
}

.header-bar-panel {
  font-size: 16px;
  font-weight: 600;
  color: #5e5f61;
  padding: 30px 40px 40px 30px;
  text-transform: uppercase;
  text-shadow: 0px 1px 10px #d6d6d6;
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

.contact-box {
  min-height: 300px;
  min-width: 15em;
  overflow-x: hidden;
  border-radius: 7px 0px 0px 7px;
  background-color: #343b45;
}


.names li {
  position: relative;
  box-sizing: border-box;
  /* margin-left: 25px; */
  color: #bfbfbf;
  border-radius: 20px 0px 0px 20px;
  overflow: hidden;
  height: 40px;
  line-height: 41px;
  padding-left: 7px;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 13px;
  transition: background-color ease-in-out 0.23s;
}

.names li.active {
  background-color: #f7f7f7;
  color: #343b45;
  font-weight: bold;
  text-shadow: none;
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
}

.overflow::-webkit-scrollbar {
  display: none;
}

.img-icon-block {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 50%;
  background-color: #b493e8;
  line-height: 31px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  margin-right: 5px;
}

.group-counter {
  position: absolute;
  display: block;
  right: 10px;
  top: 10px;
  height: 22px;
  min-width: 25px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  background-color: rgba(115, 199, 227, 0.3);
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  font-weight: 500;
  font-size: 12px;
  transition: all ease-in-out 0.23s;
}

.active .group-counter {
  background-color: rgba(115, 199, 227, 1);
  color: rgba(255, 255, 255, 1);
}
</style>
