<template>
    <div v-if="background" class="blur-background"></div>
    <div v-show="editUsername" class="pop-edit">
        <div class="container">
            <div class="row mb-3">
                <span class="col-sm-4">Edit Username</span>
                <span v-if="success" class="col-sm-8 alert alert-primary" role="alert">{{ success }}</span>
                <span v-if="error" class="col-sm-8 alert alert-danger" role="alert">{{ error }}</span>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <span class="info">Please enter a username. Your username will be used to access your account.</span>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="username" type="email">
                    <span class="col-sm-4">Usernames can only contain lowercase letters and numbers.</span>
                </div>
                <label class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="password" type="password">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <span class="info">For Sucurity purposes, please type your current password to save your changes.</span>
                </div>
            </div>
            <div>
                <div v-on:click="updateUsername" class="flatbtn">Save</div>
                <div v-on:click="cancle" class="flatbtn">Cancel</div>
            </div>
        </div>
    </div>

    <div v-show="editEmail" class="pop-edit">
        <div class="container">
            <div class="row mb-3">
                <span class="col-sm-4">Edit Email Address</span>
                <span v-if="success" class="col-sm-8 alert alert-primary" role="alert">{{ success }}</span>
                <span v-if="error" class="col-sm-8 alert alert-danger" role="alert">{{ error }}</span>
            </div>
            <div class="row mb-3">
                <label class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="email" type="email">
                </div>
                <label class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="password" type="password">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <span class="info">For Sucurity purposes, please type your current password to save your changes.</span>
                </div>
            </div>
            <div>
                <div v-on:click="updateEmail" class="flatbtn">Save</div>
                <div v-on:click="cancle" class="flatbtn">Cancel</div>
            </div>
        </div>
    </div>

    <div v-show="editPassword" class="pop-edit">
        <div class="container">
            <div class="row mb-3">
                <span class="col-sm-4">Edit Password</span>
                <span v-if="success" class="col-sm-8 alert alert-primary" role="alert">{{ success }}</span>
                <span v-if="error" class="col-sm-8 alert alert-danger" role="alert">{{ error }}</span>
            </div>
            <div class="row mb-3">
                <label class="col-sm-4 col-form-label">New Password</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="newPass" type="password">
                </div>
                <label class="col-sm-4 col-form-label">New Password</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="newPassConfirm" type="password">
                </div>
                <label class="col-sm-4 col-form-label">Current Password</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" v-model="oldPass" type="password">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <span class="info">For Sucurity purposes, please type your current password to save your changes.</span>
                </div>
            </div>
            <div>
                <div v-on:click="updatePassword" class="flatbtn">Save</div>
                <div v-on:click="cancle" class="flatbtn">Cancel</div>
            </div>
        </div>
    </div>
    <div class="card nopadding">
        <div class="card-header main ">
            <div class=" row header-bar-panel">
                Account
            </div>
        </div>
        <div class="card-body silver-background">
            <div class="device-info-block">
                <div class="info-text-block">
                    <div class="info-block">
                        <div class="info-title">Username</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ user.username }}</div>
                        <div class="flatbtn" v-on:click="editUsername = true, background = true"><i
                                class="fa fa-pencil-square-o"></i><span> Edit</span></div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Email</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ user.email }}</div>
                        <div class="flatbtn" v-on:click="editEmail = true, background = true"><i
                                class="fa fa-pencil-square-o"></i><span> Edit</span></div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Password</div>
                        <div class="info-text">: &nbsp;&nbsp; ********* </div>
                        <div class="flatbtn" v-on:click="editPassword = true, background = true"><i
                                class="fa fa-pencil-square-o"></i><span> Edit</span></div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Created On</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ user.created_on }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Last Logged in</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ user.last_seen }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Approved</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ user.approval }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-title">Devices</div>
                        <div class="info-text">: &nbsp;&nbsp;{{ devices.length }}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="info-block">
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
</template>
<script>
import api from '../axioApi';
export default {
    name: 'AccountCard',
    data() {
        return {
            deviceList: [],
            user: Object,
            editUsername: false,
            editEmail: false,
            editPassword: false,
            background: false,
            error: undefined,
            success: undefined,
            username: undefined,
            email: undefined,
            password: undefined,
            oldPass: undefined,
            newPass: undefined,
            newPassConfirm: undefined
        }
    },
    computed: {
        getUser() {
            return this.$store.state.user;
        },
        devices() {
            return this.$store.state.devices;
        }
    },
    methods: {
        cancle() {
            this.editUsername = false,
                this.editEmail = false,
                this.editPassword = false,
                this.background = false,
                this.error = undefined,
                this.success = undefined,
                this.username = undefined,
                this.password = undefined,
                this.oldPass = undefined,
                this.newPass = undefined,
                this.newPassConfirm = undefined
        },
        updateUsername() {
            this.error = undefined;
            this.success = undefined;

            if (!this.username) {
                this.error = 'Username required';
                return;
            }
            if (!this.password) {
                this.error = 'Current password required';
                return;
            }

            api.axioWithToken.put('/users/username', {
                username: this.username,
                password: this.password
            }).then((response) => {
                if (response.status === 200) {
                    this.success = 'Username updated';
                    this.$store.dispatch('setUser', response.data);
                    this.user = this.getUser;
                    setTimeout(this.cancle, 3000);
                }
            },
            ).catch((error) => {
                if (error.response) {
                    this.error = error.response.data;
                }
            });
        },
        updateEmail() {
            this.error = undefined;
            this.success = undefined;

            if (!this.email) {
                this.error = 'Email required';
                return;
            }
            if (!this.password) {
                this.error = 'Current password required';
                return;
            }

            api.axioWithToken.put('/users/email', {
                email: this.email,
                password: this.password
            }).then((response) => {
                if (response.status === 200) {
                    this.success = 'Email updated';
                    this.$store.dispatch('setUser', response.data);
                    this.user = this.getUser;
                    setTimeout(this.cancle, 3000);
                }
            },
            ).catch((error) => {
                if (error.response) {
                    this.error = error.response.data;
                }
            });
        },
        updatePassword() {
            this.error = undefined;
            this.success = undefined;

            if (!this.newPass) {
                this.error = 'New password required';
                return;
            }
            if (!this.newPassConfirm) {
                this.error = 'Confirm password required';
                return;
            }
            if (!this.oldPass) {
                this.error = 'Current password required';
                return;
            }
            if (this.newPass != this.newPassConfirm) {
                this.error = 'Passwords do not match';
                return;
            }

            api.axioWithToken.put('/users/password', {
                old_password: this.oldPass,
                new_password: this.newPass
            }).then((response) => {
                if (response.status === 200) {
                    this.success = response.data;
                    setTimeout(this.cancle, 3000);
                }
            },
            ).catch((error) => {
                if (error.response) {
                    this.error = error.response.data;
                }
            });
        },
    },
    async created() {
        this.user = this.getUser;
    }
}
</script>
<style scoped>
div.blur-background {
    position: fixed;
    z-index: 8011;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.pop-edit {
    position: fixed;
    background-color: #fefefe;
    left: 50%;
    top: 50%;
    padding: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777777;
    transform: translate(-50%, -50%);
    z-index: 8012;
}

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
    z-index: 2;
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
    width: 90px;
}

.info-text {
    float: left;
}

.clear {
    clear: both;
}

.flatbtn {
    cursor: pointer;
    float: right;
    background-color: #858D9A;
    color: #FFF;
    margin: 0.3em;
    width: 60px;
    font-size: 0.9em;
    text-align: center;
    border-radius: 15px;
    box-shadow: 1px 3px 3px #b5b5b5;
}

.span_button {
    float: right;
    background-color: #2dcc1d;
    padding: 5px 5px;
    cursor: pointer;
    color: #fff;
    border-radius: 7px;
    font-size: 0.9em;
    width: 60px;
}
</style>
