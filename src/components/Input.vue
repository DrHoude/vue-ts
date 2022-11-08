<script setup lang="ts">

import CalendarViewVue from './test comp/CalendarView.vue';

import CalendarPageVue from './CalendarPage.vue';

import { computed } from '@vue/reactivity';
import {ref} from 'vue';
import { formatDateFull} from '../utils';



const props = defineProps ({
    showTime: Boolean,
    showMonths: Boolean
})

const visible = ref(true)

 const currentDate = ref(new Date() )


 const currentDateString =  computed(()=> formatDateFull(currentDate.value, {
    hideTime: !props.showTime
 }));
 
 const updateCurrentDate = (date: Date) => {
    currentDate.value = new Date(date)
 }


 
</script>

<template>
    <div id="wrapper" @click="visible = !visible" > 
        <div>{{currentDateString}}</div>
    </div>


   <!--<CalendarPageVue v-if = "visible" @day-selected="updateCurrentDate" :showMonths="showMonths"/>-->



</template>

<style scoped>
#wrapper {
    min-height: 20px;
    padding: 5px;
    margin-top: 10px;

    max-width: 200px;
    background-color: white;
    
    
}
</style>