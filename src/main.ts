import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')


let date1 = new Date(2021,2)
let date2 = new Date(2022,4)

console.log(date1.getTime(),date2.getTime())