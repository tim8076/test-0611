import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createPinia } from 'pinia'

import './assets/scss/all.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app')
