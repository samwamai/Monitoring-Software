<template>
    <div class="container-flex thread pt-4">
        <ul v-bind:key="message.id" v-for="message in messageThread" class="chat-list">
            <li v-if="message.type === 'inbox'" class="in">
                <div class="chat-img">
                    <img alt="Avtar" src="../assets/userin.png">
                </div>
                <div class="chat-body">
                    <div class="chat-message">
                        <h5>{{ message.address }}</h5>
                        <p>{{ message.message }}</p>
                    </div>
                    <div class="date">{{ message.date }}</div>
                </div>
            </li>
            <li v-else class="out">
                <div class="chat-img">
                    <img alt="Avtar" src="../assets/login-person.png">
                </div>
                <div class="chat-body">
                    <div class="chat-message">
                        <h5></h5>
                        <p>{{ message.message }}</p>
                    </div>
                    <div class="date">{{ message.date }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'MessageThread',
    props: {
        messageThread: Array
    }
}
</script>
<style scoped>
.date {
    font-weight: 300;
    font-style: oblique;
    font-size: 75%;
    color: rgb(85, 81, 81);
    padding-top: 2px;
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
    font-size: .5rem;
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

.chat-list .out .chat-img {
    float: right;
}

.chat-list .out .chat-body {
    float: right;
    margin-right: 20px;
    text-align: right;
}

.chat-list .out .chat-message {
    /* background: #fc6d4c; */
    color: #313131;
    background-color: #87d0e0;
}

.chat-list .out .chat-message:before {
    right: -12px;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #87d0e0;
}

</style>


