import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import PasswordRecovery from '../views/PasswordRecovery.vue';
import PageNotFound from '../views/PageNotFound.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LandingPage from '../views/LandingPage.vue';
import MessagesCard from '../components/MessagesCard.vue';
import CallLogsCard from '../components/CallLogsCard.vue';
import CallRecordingCard from '../components/CallRecordingCard';
import ContactsCard from '../components/ContactsCard.vue';
import DashboardCard from '../components/DashboardCard.vue';
import store from '/src/stores/store';


const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next();
    return;
  }
  router.push({ path: '/login' });
};

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'home',
    redirect: { path: "/home/dashboard" },
    component: HomePage,
    children: [
      {
        path: "messages",
        name: "messages",
        component: MessagesCard
      },
      {
        path: "calllogs",
        name: "calllogs",
        component: CallLogsCard
      },
      {
        path: "callrecords",
        name: "callrecords",
        component: CallRecordingCard
      },
      {
        path: "contacts",
        name: "contacts",
        component: ContactsCard
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardCard
      }
    ],
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/recovery',
    name: 'recovery',
    component: PasswordRecovery
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
