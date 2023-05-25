import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import ToastC from '../src/components/ToastC';
import store from '../src/stores/store';
import loaderS from '../src/components/LoadingSpinner';



const app = createApp(App);
// globaly availble
app.component('ToastNotification', ToastC);
app.component('loaderS',loaderS);
app.use(router);
app.use(store);
app.mount('#app');
