<template>
    <div  class="container-flex d-flex justify-content-center align-items-center" id="recovery">
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
      <div v-show="showEmail" class="form-group">
        <input type="email" class="input-theme form-control mb-1" v-model="email" id="email" aria-describedby="email" placeholder="Enter Email">
      </div>
      <div v-show="showCode" class="form-group">
        <input type="text" class="input-theme form-control mb-1" v-model="code" id="code" aria-describedby="code" placeholder="Enter Code">
      </div>
      <div v-show="showPasswords" class="form-group">
        <input type="password" class="input-theme form-control mb-1" v-model="password" id="pasword" aria-describedby="password" placeholder="New Password">
      </div>
      <div v-show="showPasswords" class="form-group">
        <input type="password" class="input-theme form-control mb-2" v-model="confirmPassword" id="confirm pasword" aria-describedby="Confirm password" placeholder="Confirm Password">
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-theme flex-grow-1 mb-2" aria-describedby="login">Send</button>
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
    export default {
        name: 'LoginPage',
        components: {
        },
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                showEmail:true,
                showPasswords:false,
                showCode:false,
                showAlert: false,
                alertMessage: '',
                showSuccess: false,
                successMessage: '',
            }
        },
        methods: {
    
            onSubmit(e) {
                e.preventDefault();
    
                if (!this.email) {
                    this.showAlertF('Please type in Your Email');
                    return;
                }
                if(this.showCode && !this.code){
                    this.showAlertF('Please type in Code Sent');
                    return;
                }
                if(this.showPasswords){

                    if (!this.password) {
                    this.showAlertF('Please type in Your New Password');
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
                }
                

                if(!this.showPasswords && !this.showCode){
                    this.postEmail(this.email)
                }else if(this.showCode){
                    this.postCode(this.code)
                }
                else{
                    const recovery = {
                    email: this.email,
                    password: this.password,
                } 
                this.postRecovery(recovery)  
                }
        
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
    
            async postEmail(email) {
                console.log(email)
               
                this.showSuccessF('Successfull Sent Code Please Check Your Email')
                this.showCode=true;
                this.showEmail=false;
            },

            async postCode(code) {
                console.log(code)
               
                this.showPasswords=true;
                this.showEmail=false;
                this.showCode=false;
            },

            async postRecovery(logins) {
                console.log(logins)
               
                this.showSuccessF('Successfull')
                this.clearPage()

            },

            clearPage(){
                setTimeout(() => {
                    this.email = '',
                    this.password = '',
                    this.confirmPassword = '',
                    this.code = '',
                    this.showPasswords=false,
                    this.showCode=false,
                    window.location.href = "/login"  
                }, 3000);
                              }

        },
    
       
    
    }
    </script>
    <style scoped>
    #recovery{
        background-color: #BAC2CD;
        position:fixed;
        padding:0;
        margin:0;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
    }
.btn-theme{
font-size: 18px;
font-family: "Roboto",Arial, Helvetica, sans-serif;
color: #717070;
background-color: #fafaf9;
cursor: pointer;
box-shadow: inset 0 0px 1px 1px #333; 
height: 50px;
width: 280px;}
.input-theme{
height: 50px;
width: 280px;    
background-color: #444444;    
font-size: 13px;
color: #d8d8d8;
text-shadow: 0px 0px 4px #534d4d;
font-family: "Roboto",Arial, Helvetica, sans-serif;
}
.notification-theme{
 width: 280px;
}
    </style>
    