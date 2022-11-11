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

// function updateDateByOption(option: string) {
//     let newDate: Date | undefined = props.date

//     switch (option) {
//         case 'showToday':
//         newDate = new Date()
//             break;
//         case 'showYesterday':
//         newDate = new Date()
//         newDate.setDate(newDate.getDate()-1)
//             break;
//     }

//     updateDate(newDate!)

// }


// function showLastWeek() {
  
//   let first = new Date(calendarFromShowingDate.value)
//   let last = new Date(calendarFromShowingDate.value.setDate(calendarFromShowingDate.value.getDate()-7))



//   while(first.getDate() != last.getDate()) {
//       first.setDate(first.getDate()-1)
//       arrLastWeek.value.push(new Date(first))
//   }

//   console.log(first)
//   console.log(last)
//   console.log(arrLastWeek.value)



//   return arrLastWeek

 

 
// }



</script>


<template>

    <div>
        

        <div class="container">
            <!-- <div class="options" v-if="props.showTypeMode">
                <ul >
                    <li><input type="button" value="Today" @click="updateDateByOption('showToday')"></li>
                    <li><input type="button" value="Yesterday" @click="updateDateByOption('showYesterday')"></li>
                    <li><input type="button" value="Last 7 days" @click="showLastWeek"></li>
                    <li><input type="button" value="Last 14 days"></li>
                    <li><input type="button" value="Last 30 days"></li>
                    <li><input type="button" value="Whole period"></li>
                    <li><input type="button" value="Custom"></li>
                </ul>
                
            </div> -->
            <div>{{props.date}}</div>

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

    /* .container {
       
        height: 300px;
        width: 800px;
        margin-top: 20px;
        padding: 0 15px;
        display: flex;
        justify-content: space-around;
    } */

    .calendar-container {
        width: 450px;
        display: flex;
        justify-content: space-between;
      
        
        
    }


   

</style>