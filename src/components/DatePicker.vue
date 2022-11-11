<script setup lang="ts">

import InputVue from './Input.vue' 

import CalendarsWrapper from './CalendartsWrapper.vue'

import SideBarVue from './SideBar.vue';

import { DateInterval } from '../types'

import { onMounted, ref, Ref, computed, watch } from 'vue';
import { formatDateFull } from '../utils';


const props = defineProps ({
        showTime: Boolean,
        showTypeDayMonth: Boolean,
        showTypeMode: Boolean

    })

const visible = ref(true)
const date = ref(new Date())
const dateInterval: Ref<DateInterval> = ref({
    from: date.value,
    to: date.value
})

watch(dateInterval, (value)=>{
    console.log(value)
}, { deep: true })

const calendarFromShowingDate = ref(date.value)

const calendarToShowingDate = computed(() => {
    let nextObj = new Date(calendarFromShowingDate.value)
    if (props.showTypeDayMonth) {
        nextObj.setFullYear(calendarFromShowingDate.value.getFullYear()+1)
    } else {
        nextObj.setMonth(calendarFromShowingDate.value.getMonth()+1)
    }
    return nextObj
})


function updateShowingDateBack() {
    calendarFromShowingDate.value =  props.showTypeDayMonth ? new Date(calendarFromShowingDate.value.setFullYear(calendarFromShowingDate.value.getFullYear() - 1)) : new Date(calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() - 1)) 
}


function updateShowingDateNext() {
    calendarFromShowingDate.value =  props.showTypeDayMonth ? new Date(calendarFromShowingDate.value.setFullYear(calendarFromShowingDate.value.getFullYear() + 1))  :  new Date(calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() + 1)) 
}


function updateDate(newDate:Date) {
   date.value = newDate
   dateInterval.value = {
    from: newDate,
    to: newDate
   }
   
}

function updateDateInterval(value: DateInterval) {
    dateInterval.value = value
  
}



const currentDateString =  computed(()=> dateInterval.value.from === dateInterval.value.to ? formatDateFull(date.value, {
    hideTime: !props.showTime
}) : `${formatDateFull(dateInterval.value.from, {
    hideTime: !props.showTime
})} - ${formatDateFull(dateInterval.value.to, {
    hideTime: !props.showTime
})}`);



</script>

<template>
    <div class="container">
        <InputVue :current-date-string="currentDateString " @click="visible=!visible"/>

        <div class="calendar-container" v-if="visible">
            <SideBarVue @update-date="updateDate" v-if="props.showTypeMode" @update-date-interval="updateDateInterval"/>

            <CalendarsWrapper 
                :date="date" 
                :calendarFromShowingDate="calendarFromShowingDate"
                :calendarToShowingDate="calendarToShowingDate"
                :show-type-day-month="props.showTypeDayMonth"
                :show-type-mode="props.showTypeMode"  
                :date-interval="dateInterval"
                @update-date="updateDate"
                @moveBack="updateShowingDateBack"
                @moveNext="updateShowingDateNext"
                @update-date-interval="updateDateInterval"
                
            />
        </div>
        
    </div>
    
</template>

<style scoped>
    .container {
        margin-left: 30px;  
    }

    .calendar-container {
        display: flex;
        background-color: white;
        height: 300px;
        width: 800px;
        margin-top: 20px;
        padding: 0 15px;
        justify-content: space-around;
    }
</style>