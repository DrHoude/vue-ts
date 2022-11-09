<script setup lang="ts">
import { ref, computed, toRefs, watch } from 'vue'
import { formatDateTitle, getAllDaysInMonth, getMonths} from '../../utils';

const props = defineProps ({
    showMonths: Boolean
})

 
let showDateObj = ref(new Date())
let selectedDateObj = ref(new Date())

let months = getMonths()






const week = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])



let showDateString = computed(() => {
    return formatDateTitle(showDateObj.value)
})

let showDateStringNext = computed(()=> {
    let nextObj = new Date(showDateObj.value)
    nextObj.setMonth(showDateObj.value.getMonth()+1)
    return formatDateTitle(nextObj)
})

let dateObjs = computed(() => {
    return getAllDaysInMonth(showDateObj.value)
})



let dateObjsNext = computed(()=> {
    let nextObj = new Date(showDateObj.value)
    nextObj.setMonth(showDateObj.value.getMonth()+1)
    return getAllDaysInMonth(nextObj)
})





function nextDate() {
    
    
    return showDateObj.value = new Date(showDateObj.value.setMonth(showDateObj.value.getMonth() + 1))
    
    
}


function previousDate() {
    showDateObj.value = new Date(showDateObj.value.setMonth(showDateObj.value.getMonth() - 1))
  
}

function getDateClasses(dateObj: Date) {
    return {
        'selected-date': selectedDateObj.value.toString()===dateObj.toString(), 
        'not-current-month-day': showDateObj.value.getMonth() !== dateObj.getMonth()
    }
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

        <div class="container-1">

            <header>
                <button @click="previousDate" class="btnPrevious"></button>
                <h3>{{ showDateString }}</h3>    
               
            </header>

            <div class="calendar-container">

                <div v-if ="!props.showMonths">
                
                    <div class="calendar-week">
                        <div v-for="item in week" class="week-day">
                            {{ item }}
                        </div>
                    </div>

                    <div class="calendar-days">
                        <div 
                        v-for="dateObj in dateObjs" @click="daySelected(dateObj)"
                        :class="getDateClasses(dateObj)"
                         >{{ dateObj.getDate() }}</div>
                    </div>
    
                </div>

                <div v-else class="calendar-months">
                    <div v-for="month in months" class="calendar-month">{{month}}</div>
                </div>
                    
                
            </div>

        </div>

        <div class="container-2">

            <header>
                <h3>{{showDateStringNext}}</h3>
                <button @click="nextDate" class="btnNext"></button>
            </header>

            <div class="calendar-container">

                <div v-if ="!props.showMonths">
                    <div class="calendar-week">
                        <div v-for="item in week" class="week-day">
                            {{ item }}
                        </div>
                    </div>

                    <div class="calendar-days">
                        <div :class="{'selected-date': selectedDateObj.toString()===dateObjNext.toString()}" 
                            v-for="dateObjNext in dateObjsNext" @click="daySelected(dateObjNext)" >{{ dateObjNext.getDate() }}</div>
                    </div>

                </div>

                <div v-else class="calendar-months">
                    <div v-for="month in months" class="calendar-month">{{month}}</div>
                </div>

                

            </div>
            
        </div>
        
    
    </div>
</template> 
 
<style scoped>
.not-current-month-day {
    color: grey;
}

.btnNext {
    background-image: url(../assets/3.png);
    background-size: cover;
    width: 20px;
    border: none;
    background-color: white;
    
}

.btnPrevious  {
    background-image: url(../assets/2.png);
    background-size: cover;
    width: 20px;
    border: none;
    background-color: white;
   
} 

.img {
    height: 20px;
    width: 20px;
}

.container {
    margin-left: 30px;
    margin-top: 20px;
    background-color: white;
    
    min-height: 300px;
    min-width: 600px;
    padding: 0 10px;

    display: flex;
    justify-content: space-around;
}
.container-1,
.container-2 {
    min-width: 200px;
}

.selected-date{
    background-color: blue;
    border-radius: 100%;
    
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
    row-gap: 10px;
    background-color: white;   
}

.calendar-months {
    display: flex ;
    flex-wrap: wrap;
    width: 250px;
    margin-top: 15px;

    
}

.calendar-month {
    border: 1px solid rgb(168, 163, 163);
    cursor: pointer;
    width: 25px;
    font-size: 14px;
    margin-left: 15px;
    margin-bottom: 15px;
    padding: 5px 20px;
}

.day {
   
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