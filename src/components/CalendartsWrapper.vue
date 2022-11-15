<script setup lang="ts">

import Calendar from './Calendar.vue'
import { ref,computed, Ref, PropType } from 'vue'

import { DateInterval } from '../types'

import DateCalendarVue from './DateCalendar.vue';

import MonthCalendarVue from './MonthCalendar.vue';

import DateVue from './test comp/Date.vue'
import MonthVue from './test comp/Month.vue'



const props = defineProps ({
    date: Date,
    calendarFromShowingDate: Date,
    calendarToShowingDate: Date,
    
    showTypeDayMonth: Boolean,
    dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
})



const emit = defineEmits< {
    (e: 'update-date', value: Date):void
    (e: 'updateDateInterval', value: DateInterval): void,
}>()

function updateDate(date: Date) {
    emit('update-date', date )
    
}

</script>


<template>
    <div>
        <div class="container">
            <div class="calendar-container" v-if="!props.showTypeDayMonth">

                <DateCalendarVue
                    :date="date"
                    :showingDate="calendarFromShowingDate" 
                 
                    :leftArrow="true"
                    :dateInterval="props.dateInterval"
                    @update-date ="updateDate" 
                    @moveBack="$emit('moveBack')"
                    @updateDateInterval="(value:any) => $emit('updateDateInterval', value)"
                />

                <DateCalendarVue
                    :date="date"
                    :showingDate="calendarToShowingDate" 
                   
                    :rightArrow="true" 
                    :dateInterval="props.dateInterval"
                    @update-date="updateDate" 
                    @moveNext="$emit('moveNext')"
                    @updateDateInterval="(value:any) => $emit('updateDateInterval', value)"
                />
            </div>


            <div class="calendar-container" v-else>
                <MonthCalendarVue
                    
                    :showingDate="calendarFromShowingDate" 
                    :leftArrow="true"
                    :dateInterval="props.dateInterval"
                    @moveBack="$emit('moveBack')"
                    @updateDateInterval="(value:DateInterval) => $emit('updateDateInterval', value)"
                    @update-month="updateDate"
                />

                <MonthCalendarVue
                  
                    :showingDate="calendarToShowingDate" 
                    :rightArrow="true" 
                    :dateInterval="props.dateInterval"
                    @moveNext="$emit('moveNext')"
                    @updateDateInterval="(value:DateInterval) => $emit('updateDateInterval', value)"
                    @update-month="updateDate"
                />
            </div>

            
        </div>

    

    </div>
    
</template>

<style scoped>

    .calendar-container {
        width: 450px;
        display: flex;
        justify-content: space-between;
      
        
        
    }


   

</style>