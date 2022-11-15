<script setup lang="ts">

import InputVue from './Input.vue' 

import CalendarsWrapper from './CalendartsWrapper.vue'

import SideBarVue from './SideBar.vue';

import FooterVue from './Footer.vue';

import { DateInterval } from '../types'

import { onMounted, ref, Ref, computed, watch } from 'vue';
import { formatDateFull } from '../utils';

import { formatDateTitle } from '../utils';


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



// const calendarFromShowingDate = ref(new Date(date.value))



// const calendarToShowingDate = computed(() => {
//     let nextObj = new Date(calendarFromShowingDate.value)
//     if (props.showTypeDayMonth) {
//         nextObj.setFullYear(calendarFromShowingDate.value.getFullYear()+1)
//     } else {
//         nextObj.setMonth(calendarFromShowingDate.value.getMonth()+1)
//     }
//     return nextObj
// })


// function updateShowingDateBack() {
//     calendarFromShowingDate.value =  props.showTypeDayMonth ? new Date(calendarFromShowingDate.value.setFullYear(calendarFromShowingDate.value.getFullYear() - 1)) : new Date(calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() - 1)) 
// }


// function updateShowingDateNext() {
//     calendarFromShowingDate.value =  props.showTypeDayMonth ? new Date(calendarFromShowingDate.value.setFullYear(calendarFromShowingDate.value.getFullYear() + 1))  :  new Date(calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() + 1)) 
// }

const calendarToShowingDate = ref(new Date(date.value))

const calendarFromShowingDate  = computed(() => {
    let nextObj = new Date(calendarToShowingDate.value)
    if (props.showTypeDayMonth) {
        nextObj.setFullYear(calendarToShowingDate.value.getFullYear()-1)
    } else {
        nextObj.setMonth(calendarToShowingDate.value.getMonth()-1)
    }
    return nextObj
})

function updateShowingDateBack() {
    calendarToShowingDate.value =  props.showTypeDayMonth ? new Date(calendarToShowingDate.value.setFullYear(calendarToShowingDate.value.getFullYear() - 1)) : new Date(calendarToShowingDate.value.setMonth(calendarToShowingDate.value.getMonth() - 1)) 
}


function updateShowingDateNext() {
    calendarToShowingDate.value =  props.showTypeDayMonth ? new Date(calendarToShowingDate.value.setFullYear(calendarToShowingDate.value.getFullYear() + 1))  :  new Date(calendarToShowingDate.value.setMonth(calendarToShowingDate.value.getMonth() + 1)) 
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
    calendarToShowingDate.value = value.to
  
}



const currentDateString =  computed(()=> 

props.showTypeDayMonth ? (dateInterval.value.from === dateInterval.value.to ? formatDateTitle(date.value): 

`${formatDateTitle(dateInterval.value.from)} - ${formatDateTitle(dateInterval.value.to)}`) :


dateInterval.value.from === dateInterval.value.to ? formatDateFull(date.value, {
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

            <SideBarVue @update-date="updateDate" v-if="props.showTypeMode" 
                @update-date-interval="updateDateInterval" 
                :show-months="props.showTypeDayMonth"
               
            />

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

            <div class="footer" v-if="!props.showTypeDayMonth">
                <FooterVue  
                    :date-interval="dateInterval" 
                    :show-type-day-month="props.showTypeDayMonth"
                    :date="date"
                
                    
                />
            </div>

           
        </div>
        
    </div>
    
</template>

<style scoped>
    .container {
        margin-left: 30px;  
        position: relative;
    }
    .footer {
        position: absolute;
        top: 85%;
        left: 40%;
    }

    .calendar-container {
        display: flex;
        background-color: white;
        height: 350px;
        width: 800px;
        margin-top: 20px;
        padding: 0 15px;
        justify-content: space-around;
    }
</style>