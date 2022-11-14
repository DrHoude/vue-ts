<script setup lang="ts">

    import { defineProps,computed,ref, PropType,Ref } from 'vue';
import { DateInterval } from '../types';
    import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';


    const props = defineProps ({
        date: Date,
        showingDate: Date,
        showMonths: Boolean,
        leftArrow: Boolean,
        rightArrow: Boolean,
        arrLastWeek: Array,
        dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
   
    
    })
   


   
  
 


    
      
    const week = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])

    const months = getMonths()


    const showDateObj = computed(()=> {
        return formatDateTitle(props.showingDate!)
    })


    const dateObjs = computed(() => {
        return getAllDaysInMonth(props.showingDate!)
    })
    console.log(dateObjs.value[0])

    function isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
    }

    function getDateFixedToDay(date: Date) {
        return  date.getTime() / (1000 * 60 * 60 * 24)
    }

    function isBeforeDay(date1: Date, date2: Date): boolean {
        return getDateFixedToDay(date1) > getDateFixedToDay(date2)
    }

    function isAfterDay(date1: Date, date2: Date): boolean {
        return getDateFixedToDay(date1) < getDateFixedToDay(date2)
    }



    function isRangeBoundary(dateInterval: DateInterval, date: Date):boolean {
        

        return isSameDay(dateInterval.from, date) || isSameDay(dateInterval.to,date)
        

    }

    function isInRange(dateInterval: DateInterval, date: Date):boolean {
        

        return isAfterDay(dateInterval.from, date) && isBeforeDay(dateInterval.to, date)
        

    }
    


    function getDateClasses(dateObj: Date) {
        const now = new Date()
      


        if (isRangeBoundary(props.dateInterval, dateObj)) {
            return 'selected-date'
        }

        return {
            // 'weekIntervalPoints': props.dateInterval.from.getMonth() === dateObj.getMonth() &&  props.dateInterval.from.getDate() === dateObj.getDate(),
            
             
            // 'current-date': props.date!.getMonth() == dateObj.getMonth() && props.date!.getDate() == dateObj.getDate(),
            // 'selected-date': props.date!.toString()===dateObj.toString(), 
            // 'not-current-month-day': props.showingDate?.getMonth() !== dateObj.getMonth(),
            'current-date': isSameDay(dateObj, now),
            'range-date': isInRange(props.dateInterval,dateObj)

        }
    }

    const emit = defineEmits<{
        (e: 'update-date', value: Date): Object
        (e: 'moveBack'):void
        (e: 'moveNext'):void
        (e: 'updateDateInterval', value: DateInterval ): void 
    }>()

    const daySelected = (date: Date) => {
        emit('update-date', date )
    }

    const isCurrentDate = (month: string) => {
        return months[props.date!.getMonth()] === month && props.date!.getFullYear() === props.showingDate?.getFullYear()
    }

    function updateDateInterval() {
        emit('updateDateInterval', props.dateInterval)
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
                 

                    <div class="calendar-day"
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
   color: red;
}
.range-date {
    background-color: aqua;
}

.weekInterval {
    color: red;
}

.weekIntervalPoints {
    background-color: rgb(133, 133, 209);
    border-radius: 100%;
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

.calendar-day {
    display: flex;
    flex: 1 1 auto;
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