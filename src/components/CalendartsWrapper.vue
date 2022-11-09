<script setup lang="ts">

import Calendar from './Calendar.vue'
import { ref,computed } from 'vue'


const props = defineProps ({
    date: Date,
    showTypeDayMonth: Boolean
   
})


const calendarFromShowingDate =  computed(()=> {
    return new Date(props.date!)
})

const calendarToShowingDate = computed(()=>{
    let nextObj = new Date(calendarFromShowingDate.value)
    nextObj.setMonth(calendarFromShowingDate.value.getMonth()+1)
    return nextObj
})


const emit = defineEmits< {
    (e: 'updateDate', value: String):any }>()

function updateDate(date:any) {
    date.value = date
    emit('updateDate', date.value )
}

function updateShowingDateBack() {
    calendarFromShowingDate.value.setMonth(calendarFromShowingDate.value.getMonth() + 1)
    console.log(calendarFromShowingDate.value)
    
}


function updateShowingDateNext() {}





</script>


<template>
    <div class="container">

        <Calendar :showingDate="calendarFromShowingDate" 
        :showMonths="props.showTypeDayMonth" @update-date ="updateDate" 
        :leftArrow="true" @moveBack="updateShowingDateBack"/>

        <Calendar :showingDate="calendarToShowingDate" 
        :showMonths="props.showTypeDayMonth" @update-date="updateDate" 
        :rightArrow="true" @moveNext="updateShowingDateNext"/> 

        <!--<Calendar :date = "date" :showingDate="calendarFromShowingDate" @update:date="updateDate"
             @moveBackward="updateShowingDateBackword"/>

        <Calendar :date = "date" :showingDate="calendarToShowingDate" @update:date="updateDate" 
            @moveForward="updateShowingDateForward"/>-->
    </div>
    
</template>

<style scoped>

    .container {
        background-color: white;
        height: 300px;
        width: 600px;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }

</style>