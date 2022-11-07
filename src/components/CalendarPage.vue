<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatDateTitle, getAllDaysInMonth} from '../utils';



let showDateObj = ref(new Date())
let selectedDateObj = ref(new Date())




const week = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])

let showDateString = computed(() => {
    return formatDateTitle(showDateObj.value)
})

let dateObjs = computed(() => {
    return getAllDaysInMonth(showDateObj.value)
})

function nextDate() {
    showDateObj.value = new Date(showDateObj.value.setMonth(showDateObj.value.getMonth() + 1))
    console.log(showDateObj.value)
}

function previousDate() {
    showDateObj.value = new Date(showDateObj.value.setMonth(showDateObj.value.getMonth() - 1))
    console.log(showDateObj.value)
}




const emit = defineEmits<
(e: 'day-selected', value: Date) => {}>()

 
const daySelected = (day: Date) => {
    console.log(day)
    selectedDateObj.value = new Date(day)
    emit('day-selected', selectedDateObj.value )
}

</script>

<template>
    <div class="container">
        <header>
            <button @click="previousDate">Previous</button>
           
            
            <h3>{{ showDateString }}</h3>
            <button @click="nextDate">Next</button>
        </header>

        <body>
            <div class="calendar-container">
                <div class="calendar-week">
                    <div v-for="item in week" class="week-day">
                        {{ item }}
                    </div>
                </div>

                <div class="calendar-days">
                    <div :class="{'selected-date': selectedDateObj.toString()===dateObj.toString()}" v-for="dateObj in dateObjs" @click="daySelected(dateObj)">{{ dateObj.getDate() }}</div>
                </div>

            </div>
           

        </body>
    </div>
</template> 
 
<style scoped>

.container {
    margin-left: 30px;
    margin-top: 20px;
    background-color: white;
    
    min-height: 300px;
    min-width: 300px;
}

.selected-date{
    background-color: blue;
}


.calendar-week {
    display: flex;
    padding-top: 20px;
    background-color: white;
    
}

.week-day {
    display: flex;
    flex: 1 1 auto;
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 20px;
    padding-top: 20px;
    background-color: white;
    
}

.day {
    display: flex;
    flex: 1 1 auto;
}

button {
    margin: 0;
    padding: 0;
    max-height: 30px;
}

header {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
}

h3 {
    margin: 0;

}


</style>