<script setup lang="ts">

import InputVue from './Input.vue' 

import CalendarsWrapper from './CalendartsWrapper.vue'

import { ref } from 'vue';


const props = defineProps ({
        showTime: Boolean,
        showTypeDayMonth: Boolean
    })

const date = ref(new Date())

function updateDate(newDate:any) {
  date.value = newDate
 

}


</script>

<template>
    <div class="container">
        <InputVue :show-time="props.showTime" :date="date"/>
        <CalendarsWrapper :date="date" :show-type-day-month="props.showTypeDayMonth"  @update-date="updateDate"/>
    </div>
    
</template>

<style scoped>
    .container {
        margin-left: 30px;
        
    }
</style>