<template>
    <div class="container-flex d-flex justify-content-center align-items-center" id="login">
        <div class="col-auto">
            <div class="container-flex d-flex justify-content-center mb-4">
                <img src="../assets/login-person.png" width="65" height="65" alt="" id="logo">
            </div>
            <div v-show="showAlert" class="notification-theme alert alert-danger" role="alert">
                {{ alertMessage }}
            </div>
            <div v-show="showSuccess" class="notification-theme alert alert-primary" role="alert">
                {{ successMessage }}
            </div>
            <div class="container-flex">
                <form @submit="onSubmit">
                    <div class="form-group">
                        <input type="text" class="input-theme form-control mb-1" v-model="username" id="username"
                            aria-describedby="username" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <input type="email" class="input-theme form-control mb-1" v-model="email" id="email"
                            aria-describedby="email" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="input-theme form-control mb-1" v-model="password" id="pasword"
                            aria-describedby="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <input type="password" class="input-theme form-control mb-2" v-model="confirmPassword"
                            id="confirm pasword" aria-describedby="Confirm password" placeholder="Confirm Password">
                    </div>
                    <div class="d-flex">
                        <button type="submit" class="btn-theme btn flex-grow-1  mb-2"
                            aria-describedby="login">Register</button>
                    </div>
                </form>
            </div>
            <div class="container-flex d-flex  justify-content-center">
                <a href="/login" class="nav-link">Login</a>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../axioApi';
export default {
    name: 'LoginPage',
    components: {
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            showAlert: false,
            alertMessage: '',
            showSuccess: false,
            successMessage: '',
        }
    },
    methods: {

        onSubmit(e) {
            e.preventDefault();

            if (!this.username) {
                this.showAlertF('Please type in Your Username');
                return;
            }
            if (!this.email) {
                this.showAlertF('Please type in Your Email');
                return;
            }
            if (!this.password) {
                this.showAlertF('Please type in Your Password');
                return;
            }
            if (!this.confirmPassword) {
                this.showAlertF('Please type in Your Confirm Password');
                return;
            }
            if (this.password != this.confirmPassword) {
                this.showAlertF('Passwords Dont March');
                return;
            }

            const user = {
                username: this.username,
                email: this.email,
                password: this.password,
            }
            this.postRegister(user);
        },
        showAlertF(message) {
            this.showAlert = true;
            this.alertMessage = message;
            setTimeout(() => {
                this.showAlert = false;
                this.alertMessage = '';
            }, 3000);
        },

        showSuccessF(message) {
            this.showSuccess = true;
            this.successMessage = message;
            setTimeout(() => {
                this.showSuccess = false;
                this.successMessage = '';
            }, 5000);
        },

        async postRegister(register) {
            api.axioNoToken.post('/register', register)
                .then((response) => {
                    if (response.status === 201) {
                        this.$router.push({ path: '/login' });
                    }
                },
                    (error) => {
                        this.showAlertF(error.response.data);
                    });

        },
    },
    created() {
        if (this.$store.state.isLoggedIn) {
            this.$router.push({ path: '/home' });
        }
    }
}
</script>
<style scoped>
#login {
    background-color: #BAC2CD;
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.btn-theme {
    font-size: 18px;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: #717070;
    background-color: #fafaf9;
    cursor: pointer;
    box-shadow: inset 0 0px 1px 1px #333;
    height: 50px;
    width: 280px;
}

.input-theme {
    height: 50px;
    width: 280px;
    background-color: #444444;
    font-size: 13px;
    color: #d8d8d8;
    text-shadow: 0px 0px 4px #534d4d;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
}

.notification-theme {
    width: 280px;
}</style>
    