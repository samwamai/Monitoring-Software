<template>
    <ToastNotification ref="toast" />
    <div class="card nopadding">
        <div class="card-header main ">
            <div class=" row header-bar-panel">
                Contacts
            </div>
            <div class="row">
                <div class="col-6 d-flex justify-content-start left-bar-panel">
                    <ul>
                        <li>
                            <a v-on:click="sortAll"><i class="fa fa-bars" style="color: #5FBB3F">
                                </i>&nbsp;&nbsp;All Contacts {{ groupedList.length }}</a>
                        </li>
                        <li>
                            <a><i class="fa fa-bars" style="color: #5FBB3F">
                                </i>&nbsp;&nbsp;Total {{ ContactsList.length }}</a>
                        </li>
                        <li>
                            <a>{{ selectedDevice.bind_name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <SearchButton :text="'Search.. Contact'" @submit-search="sortByAddress" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="container-flex">
                <div class="row">
                    <div class="col-6 nopadding overflow  border-right">
                        <ul v-for="contact in groupedList" :key="contact.id" class="contact-ul">
                            <li class="contact-list" v-on:click="itemListClicked(contact)"
                                v-bind:class="{ 'contact-list-hovered': selected == contact.id }">
                                <div class="thumb-img" id="thumb-colorize">
                                    <img v-if="contact.photo != 'null'" class="img" src="../assets/Sam.jpg">
                                    <span v-if="contact.photo == 'null'" ref="toColorItems" class="img-icon-block">{{
                                        getFirstLetter(contact.contact) }}</span>
                                </div>
                                <div class="contact-name-l">
                                    {{ contact.contact }}
                                </div>
                                <label title="Times Contacted" class="group-counter">
                                    {{ contact.times_contacted }}
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6 overflow">
                        <div class="row pt-2 pb-2 d-flex justify-content-center">
                            <div class="col-4">
                                <img v-if="ContactDetails.photo != 'null'" class="contact-right-side-img"
                                    src="../assets/Sam.jpg">
                                <img v-if="ContactDetails.photo == 'null'" class="contact-right-side-img"
                                    src="../assets/userin.png">
                                <!-- <img class="contact-right-side-img" :src="{ ContactDetails.photo }"> -->
                            </div>
                        </div>
                        <div class="contact-name row pb-2 d-flex justify-content-center">
                            {{ ContactDetails.contact }}
                        </div>
                        <div class="row pb-2 d-flex justify-content-center border-bottom">
                            <ul class="button-group">
                                <li class="sms"> <a title="SMS"><span class="fa fa-comment-o"></span> </a></li>
                                <li class="calls"> <a title="Calls"> <span class="fa fa-phone"></span> </a></li>
                                <li class="mail"> <a title="Emails"> <span class="fa fa-envelope-o"></span> </a></li>
                            </ul>
                        </div>
                        <div class="row pb-2 d-flex justify-content-center">
                            <div class="contact-info col-4">Mobile Number:</div>
                            <div class="contact-info col-4">{{ ContactDetails.address }}</div>
                        </div>
                        <div class="row pb-2 d-flex justify-content-center">
                            <div class="contact-info col-4">Email:</div>
                            <div class="contact-info col-4">{{ ContactDetails.email }}</div>
                        </div>
                        <div class="row pb-2 d-flex justify-content-center">
                            <div class="contact-info col-4">Last Contacted:</div>
                            <div class="contact-info col-4">{{ ContactDetails.last_contacted }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
</template>
<script>
import SearchButton from './SearchButton.vue';
import api from '../axioApi';

export default {
    name: 'ContactCard',
    components: {
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
                this.ContactsList = [],
                    this.groupedList = [],
                    this.fetchContacts();
            }
        }
    },
    data() {
        return {
            ContactsList: [],
            groupedList: [],
            selected: undefined,
            ContactDetails: Object
        }
    },
    methods: {
        async fetchContacts() {
            api.axioWithToken.get(`/contacts/deviceid/${this.selectedDevice.device_unique_id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.ContactsList = response.data;
                        this.sortListByName();
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
        itemListClicked(contact) {
            this.selected = contact.id;
            this.ContactDetails = contact
        },
        sortAll() {
            this.groupedList = this.ContactsList
        },
        sortListByName() {
            this.ContactsList = this.ContactsList.sort((a, b) => a.contact.toLowerCase() < b.contact.toLowerCase() ? -1 : a.contact.toLowerCase() > b.contact.toLowerCase() ? 1 : a.address.toLowerCase() < b.address.toLowerCase() ? -1 : a.address.toLowerCase() > b.address.toLowerCase() ? 1 : 0)
            this.groupedList = this.ContactsList;
            this.ContactDetails = this.groupedList[0];
        },
        sortByAddress(word) {
            this.groupedList = this.ContactsList.filter((contact) => contact.address.toLowerCase().includes(word.toLowerCase()))
            if (this.groupedList == 0) {
                this.groupedList = this.ContactsList.filter((contact) => contact.contact.toLowerCase().includes(word.toLowerCase()))
            }
            if (this.groupedList.length == 1) { this.ContactDetails = this.groupedList[0] }
        },
        getFirstLetter(word) { return word.charAt(0) },

        colorize(elements) {
            if (elements.length > 0) {
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
        // this.colorize(this.$refs.toColorItems)
    },
    async created() {
        this.fetchContacts();
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

.border-right {
    /* border-right: 8px solid red; */
    border-right: 1px solid #e6e6e6;
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

.thumb-img {
    display: block;
    float: left;
    margin-left: 15px;
}

.thumb-img img {
    border-radius: 50%;
    border: 2px solid solid transparent;
    width: 45px;
    height: 45px;
    overflow: hidden;
    left: 22.5px;
    top: 22.5px;
    font-size: 25px;
    animation: pop-block 0.3s ease-in-out forwards;
    animation-delay: 0s;
}

.img-icon-block {
    display: inline-block;
    width: 45px;
    height: 45px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 50%;
    background-color: #b493e8;
    color: #fff;
    font-weight: 500;
    font-size: 25px;
}

.contact-right-side-img {
    display: block;
    border-radius: 50%;
    width: 85px;
    height: 85px;
    overflow: hidden;
    margin: 0 auto;
}

.contact-ul {
    padding: 0;
    margin: 0;
}

.contact-info {
    font-size: 14px;
    color: #666;
    margin-top: 20px;
}

.contact-name {
    text-align: center;
    font-size: 21px;
    color: #666;
}

.button-group {
    display: block;
    text-align: center;
    list-style-type: none
}

.button-group li {
    display: inline-block;
    padding: 10px 10px 10px 10px;
}

.contact-list {
    display: block;
    border-left: 8px solid transparent;
    padding: 13px 2px;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    transition: all ease-in-out 0.23s;
    cursor: pointer;
    overflow: hidden;
}

.contact-list .contact-name-l {
    display: block;
    float: left;
    margin-left: 15px;
    padding-top: 8px;
    font-size: 14px;
    color: #7d7d7d;
    font-weight: 500;
}

.contact-list:hover {
    border-left-color: #8f7eec;
    background-color: #dadada;
}

.contact-list-hovered {
    border-left-color: #8f7eec;
    background-color: #dadada;
}

.group-counter {
    float: right;
    text-align: center;
    height: 22px;
    min-width: 25px;
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(115, 199, 227, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 12px;
    transition: all ease-in-out 0.23s;
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
