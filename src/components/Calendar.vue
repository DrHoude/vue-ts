<script setup lang="ts">

    import { defineProps,computed,ref } from 'vue';
    import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';


    const props = defineProps ({
        showingDate: Date,
        showMonths: Boolean,
        leftArrow: Boolean,
        rightArrow: Boolean,
      
    })

    const week = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])

    const months = getMonths()

    

    const selectedDateObj = ref(new Date())
    console.log(selectedDateObj)
    console.log(months[selectedDateObj.value.getMonth()])

    const showDateObj = computed(()=> {
        return formatDateTitle(props.showingDate!)
    })


    const dateObjs = computed(() => {
        return getAllDaysInMonth(props.showingDate!)
    })
    console.log(dateObjs.value[0])

  
    function getDateClasses(dateObj: Date) {
        return {
            'current-date': selectedDateObj.value.getMonth() == dateObj.getMonth() && selectedDateObj.value.getDate() == dateObj.getDate(),
            'selected-date': selectedDateObj.value.toString()===dateObj.toString(), 
            'not-current-month-day': props.showingDate?.getMonth() !== dateObj.getMonth()
        }
    }

    console.log(selectedDateObj.value )
    console.log(selectedDateObj.value.getMonth())


   

    const emit = defineEmits<{
        (e: 'update-date', value: Date): Object
        (e: 'moveBack'):void
        (e: 'moveNext'):void
    }>()

    const daySelected = (day: Date) => {
        console.log(day)
        selectedDateObj.value = new Date(day)
        emit('update-date', selectedDateObj.value )
    }

    const isCurrentDate = (month: string) => {
        console.log(selectedDateObj.value.getFullYear(), props.showingDate?.getFullYear(), 'FF')
        return months[selectedDateObj.value.getMonth()] === month && selectedDateObj.value.getFullYear() === props.showingDate?.getFullYear()
    }

</script>

<template>

    <div class="calendar-wrapper">
       

        <div class="calendar">

            <header>
                <button v-if="props.leftArrow" class="btnPrevious" @click="$emit('moveBack')"></button>
                 
                <button v-if="props.rightArrow"  class="btnNext" @click="$emit('moveNext')"></button>

            </header>

            <div v-if ="!props.showMonths">

                <div class="dateTitle">{{showDateObj}}</div> 

                <div class="calendar-week">
                    <div v-for="item in week" class="week-day">{{ item }}</div>
                </div>

                <div class="calendar-days">
                    <div 
                       
                        v-for="dateObj in dateObjs" @click="daySelected(dateObj)"
                        :class="getDateClasses(dateObj)">
                        {{ dateObj.getDate() }}
                    </div>
                </div>

            </div>

            <div v-else>
                <div>{{props.showingDate?.getFullYear()}}</div> 
                <div class="calendar-months">
                    <div v-for="month in months" 
                    :class="['calendar-month' , {'current-date':  isCurrentDate(month) }]"  >{{month}}</div>
                </div>
            </div>

        </div>
    </div>

    
    
</template>

<style scoped>



.calendar {
    width: 200px;
    position: relative;
}

.dateTitle {
    position: absolute;
    top: 5px;
    left: 40px;
}

.current-date {
    color: blue;
}

header {
   position: relative;
   height: 20px;
   align-items: center;
   justify-content: center;
   margin: 15px 0;

}

.btnNext {
    background-image: url(../assets/3.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    right: -25px;
       
}

.btnPrevious  {
    background-image: url(../assets/2.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    left: -25px;
   
} 



.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 10px;
    background-color: white;   
}

    .calendar-week {
        display: flex;
        margin-bottom: 10px;
        background-color: white;
    }

    .week-day {
        display: flex;
        flex: 1 1 auto;
    }

    .selected-date{
        background-color: blue;
        border-radius: 100%;
    } 
    .not-current-month-day {
        color: grey;
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
    margin: 0 5px;
    margin-bottom: 15px;
    padding: 5px 20px;
}



  
</style>