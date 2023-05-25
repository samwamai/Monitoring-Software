<template>
    <ToastNotification ref="toast" />
    <div class="card nopadding">
        <div class="card-header main ">
            <div class=" row header-bar-panel">
                Call Recordings
            </div>
            <div class="row">
                <div class="col-6 d-flex justify-content-start left-bar-panel">
                    <ul>
                        <li>
                            <a v-on:click="sortAll"><i class="fa fa-bars" style="color: #5FBB3F">
                            </i>&nbsp;&nbsp;All Call Recordings {{ groupedList.length }}</a>
                        </li>
                        <li>
                            <a><i class="fa fa-bars" style="color: #5FBB3F">
                            </i>&nbsp;&nbsp;Total {{ CallLogsList.length }}</a>
                        </li>
                        <li>
                            <a v-on:click="sortIncoming"><i class="fa fa-arrow-left directional-icon" style="color: #5FBB3F">
                                </i>&nbsp;&nbsp;Incoming</a>
                        </li>
                        <li>
                            <a v-on:click="sortOutgoing"><i class="fa fa-arrow-right directional-icon" style="color: #DE5147">
                                </i>&nbsp;&nbsp;Outgoing</a>
                        </li>
                        <li>
                            <a v-on:click="sortMissed"><i class="fa fa-times" style="color: #545B65">
                                </i>&nbsp;&nbsp;Missed</a>
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
            <div class="row nopadding">
                <div class="col-12 ">
                    <table id="recordsList" class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"></th>
                                <th scope="col">Contact</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Date & Time</th>
                                <th scope="col">Record</th>
                            </tr>
                        </thead>
                        <tbody class="overflow">
                            <tr v-for="callrecord in groupedList" v-bind:key="callrecord.id">
                                <th scope="row"><span class="fa fa-trash-o"></span></th>
                                <td>
                                    <span v-if="callrecord.type == 0" class="fa fa-times missed  missed-icon"
                                        title="Misses Call"></span>
                                    <span v-if="callrecord.type == 1"
                                        class="fa fa-arrow-left directional-icon incomming-icon"
                                        title="Incomming Call"></span>
                                    <span v-if="callrecord.type == 2"
                                        class="fa fa-arrow-right directional-icon outgoing-icon"
                                        title="Outgoing Call"></span>
                                </td>
                                <td>{{ callrecord.contact }}</td>
                                <td style="color: #005195;">{{ callrecord.address }}</td>
                                <td>{{ callrecord.duration }}</td>
                                <td>{{ callrecord.date }}</td>
                                <td>
                                    <audio controls class='embed-responsive-item recording'>
                                        <source v-bind:src="getFileUrl(callrecord.id)">
                                    </audio>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
    name: 'CallRecordingsCard',
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
                this.CallLogsList = [],
                    this.groupedList = [],
                    this.files = [],
                    this.fetchCallRecordings();
            }
        }
    },
    data() {
        return {
            CallLogsList: [],
            groupedList: [],
            files: []
        }
    },
    methods: {
        async fetchCallRecordings() {
            api.axioWithToken.get(`/callrecordings/deviceid/${this.selectedDevice.device_unique_id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.savefiles(response.data);
                        this.CallLogsList = response.data;
                        this.groupedList = this.CallLogsList;
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
        sortAll() {
            this.groupedList = this.CallLogsList;
        },
        sortOutgoing() {
            this.groupedList = this.CallLogsList.filter((calllog) => calllog.type == 2);
        },
        sortIncoming() {
            this.groupedList = this.CallLogsList.filter((calllog) => calllog.type == 1);
        },
        sortMissed() {
            this.groupedList = this.CallLogsList.filter((calllog) => calllog.type == 0);
        },
        sortByAddress(word) {
            this.groupedList = this.CallLogsList.filter((calllog) => calllog.address.toLowerCase().includes(word.toLowerCase()));
        },
        getFileUrl(id) {
            const file = this.files.filter((file) => file.id === id);
            return file[0].file;
        },
        async savefiles(callList) {
            callList.forEach(call => { this.downloadFile(call.device_unique_id, call.record_file, call.id) });
        },
        async downloadFile(deviceId, fileName, callId) {
            try {
                const file = { id: callId, file: null };
                const response = await api.axioFilesWithToken.get(`/files/deviceid/${deviceId}/file/${fileName}`);
                const mp3 = new Blob([response.data], { type: 'audio/mp4' })
                file.file = URL.createObjectURL(mp3);//tried window.
                this.files.push(file);
            }
            catch (e) { console.log('audio error: ', e) }
        }

    },

    async created() {
        this.fetchCallRecordings();
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

.directional-icon {
    transform: rotate(-45deg);
}

.outgoing-icon {
    color: #DE5147;
}

.incomming-icon {
    color: #5FBB3F;
}

.missed-icon {
    color: #545B65;
}

#recordsList {
    /* border: none; */
    margin-top: 15px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 3px 3px 8px #9e9e9e;
    transition: all ease-in-out 0.2s;
}

#recordsList tr td {
    padding: 8px;
    padding-right: 8px;
    padding-left: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-top: 1px solid #f7f7f7;
    border-right: none;
    word-wrap: break-word;
    max-width: 400px;
    color: #888;
    font-size: 13px;
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

.recording {
    /* max-width:200px; */
}
</style>
