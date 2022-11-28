<script setup lang="ts">

import InputVue from './Input.vue' 
import CalendarsWrapper from './CalendarsWrapper.vue'
import SideBarVue from './SideBar.vue';
import FooterVue from './Footer.vue';

import { DateInterval } from '../types'

import { ref, Ref, computed, watch } from 'vue';
import { formatDateFull } from '../utils';

import { formatDateTitle } from '../utils';


const props = defineProps ({
        showTime: Boolean,
        showTypeDayMonth: Boolean,
        showTypeMode: Boolean,
    })

const selectedOption = ref()


const visible = ref(true)
const date = ref(new Date())
const dateInterval: Ref<DateInterval> = ref({
    from: date.value,
    to: date.value
})

watch(dateInterval, (value)=>{
    console.log(value)
}, { deep: true })


watch(selectedOption, (value)=>{
    if (value !== undefined) {
        calendarToShowingDate.value = dateInterval.value.to
    }
})


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
    calendarToShowingDate.value =  props.showTypeDayMonth ? new Date(calendarToShowingDate.value.setFullYear(calendarToShowingDate.value.getFullYear() - 1)) 
    : new Date(calendarToShowingDate.value.setMonth(calendarToShowingDate.value.getMonth() - 1)) 
}


function updateShowingDateNext() {
    calendarToShowingDate.value =  props.showTypeDayMonth ? new Date(calendarToShowingDate.value.setFullYear(calendarToShowingDate.value.getFullYear() + 1))  
    : new Date(calendarToShowingDate.value.setMonth(calendarToShowingDate.value.getMonth() + 1)) 
}


function updateDate(newDate:Date) {
   date.value = newDate
   dateInterval.value = {
    from: newDate,
    to: newDate
   }
   
   if(selectedOption.value != undefined) {
    selectedOption.value = undefined
   }
}

function updateSelectedOption(option:string) {
    selectedOption.value = option
}

function updateDateInterval(value: DateInterval) {
    dateInterval.value = value  
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
    <div class="date-container">

        <InputVue :current-date-string="currentDateString " @click="visible=!visible"/>

        <div class="calendar-container" v-if="visible">

            <SideBarVue @update-date="updateDate" v-if="props.showTypeMode" 
                @update-date-interval="updateDateInterval" 
                :show-months="props.showTypeDayMonth"
                :selected-option="selectedOption"
                @update-selected-option="updateSelectedOption"
               
            />
            <div>
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

                <div v-if="!props.showTypeDayMonth  && props.showTime">
                    <FooterVue  
                        :date-interval="dateInterval" 
                        :show-time="props.showTime"
                        :date="date"
                        @update-date-interval="updateDateInterval" 
                    />
                </div>
            </div>

          

            
        </div>
     
    </div>
    
</template>

<style scoped>
    .date-container {
        margin-left: 30px;  
        position: relative;
    }
    .calendar-container {
        display: flex;
        background-color: white;
        margin-top: 20px;
    
        justify-content: space-around;
    }
  
</style>