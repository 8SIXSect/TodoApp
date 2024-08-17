import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia'
import { createApp } from 'vue';
import App from './App.vue';
import SignupView from './views/SignupView.vue';
import LoginView from './views/LoginView.vue';

const routes = [
    {
        path: "/",
        component: SignupView
    },
    {
        path: "/login",
        component: LoginView
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});


const app = createApp(App);
app.provide('API_URL', import.meta.env.API_URL);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
