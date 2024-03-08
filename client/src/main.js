import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App)
app.provide('API_URL', process.env.VUE_APP_API_URL);
app.mount('#app');
