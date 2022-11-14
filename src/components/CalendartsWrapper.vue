<script setup lang="ts">

import Calendar from './Calendar.vue'
import { ref,computed, Ref, PropType } from 'vue'

import { DateInterval } from '../types'


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
    (e: 'updateDateInterval', value: DateInterval): void 

}>()

function updateDate(date: Date) {
    emit('update-date', date )
    
}





</script>


<template>

    <div>
        

        <div class="container">
            <div :class="['calendar-container']" >
                <Calendar 
                :date="date"
                :showingDate="calendarFromShowingDate" 
                :showMonths="props.showTypeDayMonth" 
                :leftArrow="true"
                :dateInterval="props.dateInterval"
             
              
             
                @update-date ="updateDate" 
                @moveBack="$emit('moveBack')"
                @updateDateInterval="(value) => $emit('updateDateInterval', value)"
              
            />

            <Calendar 
                :date="date"
                :showingDate="calendarToShowingDate" 
                :showMonths="props.showTypeDayMonth" 
                :rightArrow="true" 
                :dateInterval="props.dateInterval"
                @update-date="updateDate" 
                @moveNext="$emit('moveNext')"
                @updateDateInterval="(value) => $emit('updateDateInterval', value)"
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