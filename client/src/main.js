import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App)
const API_URL =  "http://localhost:8000/tasks/";
app.provide('API_URL', API_URL);
app.mount('#app');
