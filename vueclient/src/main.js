import { useUserDataStore } from './stores/userDataStore';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia'
import { createApp } from 'vue';
import App from './App.vue';
import SignupView from './views/SignupView.vue';
import LoginView from './views/LoginView.vue';
import DashboardView from './views/DashboardView.vue';

const routes = [
    {
        path: "/signup/",
        name: "signup",
        component: SignupView
    },
    {
        path: "/login/",
        name: "login",
        component: LoginView
    },
    {
        path: "/dashboard/",
        name: "dashboard",
        component: DashboardView,
    },
    {
        path: "/",
        redirect: {
            name: "dashboard"
        }
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});


const app = createApp(App);

const apiUrl = (path) => `${import.meta.env.VITE_API_URL}/${path}`;
app.provide('apiUrl', apiUrl);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const userDataStore = useUserDataStore();
userDataStore.setCsrfToken(apiUrl);

app.mount('#app');
