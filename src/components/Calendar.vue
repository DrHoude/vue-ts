<script setup lang="ts">

    import { defineProps,computed,ref, PropType,Ref } from 'vue';
    import { DateInterval } from '../types';
    import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';

    import {isSameDay, isBeforeDay, isAfterDay } from '../utils'



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

 

    function isSameMonth(date:Date, month:string):boolean {
        return months[date.getMonth()] === month  && date.getFullYear() === props.showingDate?.getFullYear()
    }

    function isRangeBoundaryMonth(dateInterval: DateInterval, month: string ):boolean {
        return isSameMonth(dateInterval.from, month) || isSameMonth(dateInterval.to,month)
    }

    function isInRangeMonth(dateInterval: DateInterval, month: string):boolean {
        return isAfterMonth(dateInterval.from, month) && isBeforeMonth(dateInterval.to, month)
    }

    function isBeforeMonth(date: Date, month:string):boolean {
        return  new Date(date.getFullYear(), date.getMonth()).getTime() > new Date(props.showingDate!.getFullYear(), months.indexOf(month)).getTime()
    }

    function isAfterMonth(date: Date, month:string): boolean {
        return new Date(date.getFullYear(), date.getMonth()).getTime() < new Date(props.showingDate!.getFullYear(), months.indexOf(month)).getTime()
    }



    function getMonthClasses(month:any) {
        const now = new Date()

        if (isRangeBoundaryMonth(props.dateInterval, month)) {
            return 'selected-month'
        }
        return {
            'current-month': isSameMonth(now,month),
            'range-month': isInRangeMonth(props.dateInterval,month)
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
                <div class="month-title">{{props.showingDate?.getFullYear()}}</div> 
                <div class="calendar-months">
                    <div v-for="month in months" 
                    :class="['calendar-month' , getMonthClasses(month)]"  >{{month}}</div>
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

.calendar-month {
    border: 1px solid rgb(168, 163, 163);
    cursor: pointer;
    width: 25px;
    font-size: 14px;
    margin: 0 5px;
    margin-bottom: 15px;
    padding: 5px 20px;
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