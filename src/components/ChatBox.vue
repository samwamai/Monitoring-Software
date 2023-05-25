<template>
    <div id="checkbox">
        <input v-on:click="checkBox" type="checkbox" id="check">
        <label class="chat-btn" for="check">
            <i class="fa fa-commenting-o comment"></i>
            <i class="fa fa-close close"></i>
        </label>
        <div v-show="checked" class="wrapper">
            <div class="header">
                <h6>Chat with us - Online</h6>
            </div>
            <div class="text-center p-2">
                <ul class="chat-list">
                <li class="in">
                    <div class="chat-img">
                        <img alt="Avtar" width="30" height="30" src="../assets/login-person.png">
                    </div>
                    <div class="chat-body">
                        <div class="chat-message">
                            <h5>We're Online!</h5>
                            <p>How may I help you today?</p>
                        </div>
                    </div>
                </li>
                </ul>
            </div>
            <div class="chat-form">
                <input type="text" class="form-control" placeholder="Name">
                <input type="text" class="form-control" placeholder="Email">
                <textarea class="form-control" placeholder="Your Text Message"></textarea>
                <button type="submit" class="btn btn-send"><i class="fa fa-paper-plane-o"></i> Start Chat</button>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'ChatBox',
    data(){
        return{
            checked:false
        }
    },
    methods:{
        checkBox(){
            this.checked=!this.checked
        }
    }
}
</script>
<style scoped>
#checkbox {
    z-index: 1
}

.chat-btn {
    position: fixed;
    right: 14px;
    bottom: 30px;
    cursor: pointer
}

.chat-btn .close {
    display: none
}

.chat-btn i {
    transition: all 0.9s ease
}

#check:checked~.chat-btn i {
    display: block;
    pointer-events: auto;
    transform: rotate(180deg)
}

#check:checked~.chat-btn .comment {
    display: none
}

.chat-btn i {
    font-size: 22px;
    color: #fff !important
}

.chat-btn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: rgb(0, 145, 255);
    color: #fff;
    font-size: 22px;
    border: none;
    z-index: 9;
}

.wrapper {
    position: fixed;
    right: 20px;
    bottom: 100px;
    width: 300px;
    background-color: #eaeef3;
    border-radius: 25px;
    /* opacity: 0; */
    transition: all 0.4s;
    z-index: 9;
}

/* #check:checked~.wrapper {
    opacity: 1
} */

.header {
    padding: 13px;
    background-color: rgb(0, 145, 255);
    border-radius: 25px 25px 0px 0px;
    margin-bottom: 10px;
    color: #fff
}

.chat-form {
    padding: 15px
}

.chat-form input,
textarea,
button {
    margin-bottom: 10px
}

.chat-form textarea {
    resize: none
}

.form-control:focus,
.btn:focus {
    box-shadow: none
}

.btn,
.btn:focus,
.btn:hover {
    background-color: rgb(0, 145, 255);
    border: rgb(0, 145, 255)
}

.btn-send {
    color: #fff;
}

#check {
    display: none !important
}


.chat-list {
    padding: 0;
    font-size: .8rem;
}

.chat-list li {
    margin-bottom: 10px;
    overflow: auto;
    color: #ffffff;
}

.chat-list .chat-img {
    float: left;
    width: 48px;
}

.chat-list .chat-img img {
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    width: 100%;
}

.chat-list .chat-message {
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    background: #5a99ee;
    display: inline-block;
    padding: 10px 20px;
    position: relative;
}

.chat-list .chat-message:before {
    content: "";
    position: absolute;
    top: 15px;
    width: 0;
    height: 0;
}

.chat-list .chat-message h5 {
    margin: 0 0 5px 0;
    font-weight: 600;
    line-height: 100%;
    font-size: .9rem;
}

.chat-list .chat-message p {
    line-height: 18px;
    margin: 0;
    padding: 0;
}

.chat-list .chat-body {
    margin-left: 20px;
    float: left;
    width: 70%;
}

.chat-list .in .chat-message:before {
    left: -12px;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #5a99ee;
}

</style>