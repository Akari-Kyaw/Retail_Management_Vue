import { createPinia } from 'pinia'
import './assets/css/main.css'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const queryClient = new QueryClient();
app.use(VueQueryPlugin, { queryClient });
const pinia = createPinia()

app.use(router)
app.use(pinia)


app.mount('#app')
