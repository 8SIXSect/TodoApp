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
app.provide('apiUrl', (path) => `${import.meta.env.VITE_API_URL}/${path}`);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
