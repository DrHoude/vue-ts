<script setup lang="ts">

    import { defineProps,computed,ref, PropType} from 'vue';
    import { DateInterval } from '../types';
    import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';
    import {isSameDay, isBeforeDay, isAfterDay } from '../utils'

    const props = defineProps ({
        isLast: Boolean,
        date: Date,
        showingDate: Date,
    
        leftArrow: Boolean,
        rightArrow: Boolean,
        arrLastWeek: Array,
        dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
 
    })
   
    const week = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])




    const showDateObj = computed(()=> {
        return formatDateTitle(props.showingDate!)
    })


    const dateObjs = computed(() => {
        return getAllDaysInMonth(props.showingDate!)
    })
   

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
            'not-current-month-day': props.showingDate?.getMonth() !== dateObj.getMonth(),
            'current-date': isSameDay(dateObj, now),
            'range-date': isInRange(props.dateInterval,dateObj)
        }
    }



    const emit = defineEmits<{
        (e: 'update-date', value: Date): Object
        (e: 'moveBack'):void
        (e: 'moveNext'):void
        (e: 'updateDateInterval', value: DateInterval ): void 
        (e:'handleMouseDown', value: Date): void
        (e: 'handleMouseEnter', date: Date, lastDate: Date):void
        (e:'updateisLast'):void
    }>()

    const daySelected = (date: Date) => {
        emit('update-date', date )

        

      
    }

    function mouseEnter(date:Date) {
        emit('handleMouseEnter',date, dateObjs.value[dateObjs.value.length-1])
    }


  
  
    // let isMouseDown = false;

    // function updateDateInterval(dateInterval:DateInterval) {
    //     emit('updateDateInterval', dateInterval)
    // }

    // function handleMouseUp() {
    //     console.log('mouseUp')
    //     removeEventListener('mouseup', handleMouseUp)
    //     isMouseDown = false;
        

    // }

    // function handleMouseDown(date:Date) {
    //     console.log(date)
    //     updateDateInterval({from: date, to: date})
    //    addEventListener('mouseup', handleMouseUp)
    //    isMouseDown = true;
    // }

    // function handleMouseEnter(date:Date) {
    //     console.log(isMouseDown)
    //     if (isMouseDown && isAfterDay(props.dateInterval.from, date) ) {
    //         console.log(date)
    //         updateDateInterval({from: props.dateInterval.from, to: date})
    //     }

    // }


</script>

<template>

    <div class="calendar-wrapper">
       

        <div class="calendar">

            <header>
                <button v-if="props.leftArrow" class="btnPrevious" @click="$emit('moveBack')"></button>
                 
                <button v-if="props.rightArrow"  class="btnNext" @click="$emit('moveNext')"></button>

            </header>

            <div>

                <div class="dateTitle">{{showDateObj}}</div> 

                <div class="calendar-week">
                    <div v-for="item in week" class="week-day">{{ item }}</div>
                </div>

                <div class="calendar-days">
                 

                    <div class="calendar-day"
                        v-for="dateObj in dateObjs" @click="daySelected(dateObj)"
                        
                        @mousedown = "$emit('handleMouseDown', dateObj)"
                       
                        @mouseenter = "mouseEnter(dateObj)"
                       

                        :class="getDateClasses(dateObj)">
                        {{ dateObj.getDate() }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    
</template>

<style scoped>



.calendar {
    width: 200px;
    position: relative; 
    user-select: none;
}

.dateTitle {
    position: absolute;
    top: 5px;
    left: 40px;
}

.current-date {
  color: blue;
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
    .current-date {
  color: blue;
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



.month-title {
    position: absolute;
    top: 5px;
    left: 50%;
}
.current-month {
    color: blue;
}

.selected-month {
    background-color: blue;
    color: white;
}

.range-month {
    background-color: aqua;
}




  
</style>