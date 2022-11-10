<script setup lang="ts">

import Calendar from './Calendar.vue'
import { ref,computed, onMounted, onBeforeMount, watch } from 'vue'


const props = defineProps ({
    date: Date,
    showTypeDayMonth: Boolean,
    showTypeMode: Boolean
})

console.log(props.showTypeMode)

const disabled = ref(false)

const calendarFromShowingDate = ref(props.date!)

const calendarToShowingDate = computed(() => {
    let nextObj = new Date(calendarFromShowingDate.value)
    if (props.showTypeDayMonth) {
        nextObj.setFullYear(calendarFromShowingDate.value.getFullYear()+1)
    } else {
        nextObj.setMonth(calendarFromShowingDate.value.getMonth()+1)
    }
    return nextObj
})


const emit = defineEmits< {
    (e: 'updateDate', value: String):any
    (e: 'showYesterday'):void

}>()

function updateDate(date:any) {
    date.value = date
    emit('updateDate', date.value )
    
}

function updateShowingDateBack() {
    calendarFromShowingDate.value =  props.showTypeDayMonth ? new Date(calendarFromShowingDate.value.setFullYear(calendarFromShowingDate.value.getFullYear() - 1)) : new Date(calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() - 1)) 
}


function updateShowingDateNext() {
    calendarFromShowingDate.value =  props.showTypeDayMonth ? new Date(calendarFromShowingDate.value.setFullYear(calendarFromShowingDate.value.getFullYear() + 1))  :  new Date(calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() + 1)) 
}



</script>


<template>

    <div>
        

        <div class="container">
            <div class="options" v-if="props.showTypeMode">
                <ul >
                    <li><input type="button" value="Today"></li>
                    <li><input type="button" value="Yesterday" @click="emit('showYesterday')"></li>
                    <li><input type="button" value="Last 7 days"></li>
                    <li><input type="button" value="Last 14 days"></li>
                    <li><input type="button" value="Last 30 days"></li>
                    <li><input type="button" value="Whole period"></li>
                    <li><input type="button" value="Custom"></li>
                </ul>
                
            </div>

            <div :class="['calendar-container']" >
                <Calendar :showingDate="calendarFromShowingDate" 
                :showMonths="props.showTypeDayMonth" 
                :leftArrow="true"
             
                @update-date ="updateDate" 
                @moveBack="updateShowingDateBack"
              
            />

            <Calendar :showingDate="calendarToShowingDate" 
                :showMonths="props.showTypeDayMonth" 
                :rightArrow="true" 
                @update-date="updateDate" 
                @moveNext="updateShowingDateNext"
            /> 
            </div>

            
            
            
           
        </div> 

    </div>
    
</template>

<style scoped>

    .container {
        background-color: white;
        height: 300px;
        width: 800px;
        margin-top: 20px;
        padding: 0 15px;
        display: flex;
        justify-content: space-around;
    }

    .calendar-container {
        width: 450px;
        display: flex;
        justify-content: space-between;
      
        
        
    }

    .options {
 
    }

    ul {
        list-style: none;
    }

    input {
        cursor: pointer;
        border: none;
        background-color: white;
        
    }

</style>