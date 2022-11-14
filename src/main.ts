import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')


let date = new Date()

date.setMonth(date.getMonth()-1)
console.log(date)