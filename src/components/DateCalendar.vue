<script setup lang="ts">

import { defineProps, computed, ref, PropType } from 'vue';
import { DateInterval } from '../types';
import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';
import { isSameDay, isBeforeDay, isAfterDay } from '../utils'

const props = defineProps({
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




const showDateObj = computed(() => {
    return formatDateTitle(props.showingDate!)
})


const dateObjs = computed(() => {
    return getAllDaysInMonth(props.showingDate!)
})


function isRangeBoundary(dateInterval: DateInterval, date: Date): boolean {
    return isSameDay(dateInterval.from, date) || isSameDay(dateInterval.to, date)
}


function isInRange(dateInterval: DateInterval, date: Date): boolean {
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
        'range-date': isInRange(props.dateInterval, dateObj)
    }
}



const emit = defineEmits<{
    (e: 'update-date', value: Date): Object
    (e: 'moveBack'): void
    (e: 'moveNext'): void
    (e: 'updateDateInterval', value: DateInterval): void
    (e: 'handleMouseDown', value: Date): void
    (e: 'handleMouseEnter', date: Date, lastDate: Date): void
    (e: 'updateisLast'): void
}>()

const daySelected = (date: Date) => {
    emit('update-date', date)
}

function mouseEnter(date: Date) {
    emit('handleMouseEnter', date, dateObjs.value[dateObjs.value.length - 1])
}

</script>

<template>

    <div class="calendar-card">


        <div class="calendar-card__item">

            <header class="calendar-card__buttons-wrapper">

                <button v-if="props.leftArrow" class="btnPrevious" @click="$emit('moveBack')"></button>

                <button v-if="props.rightArrow" class="btnNext" @click="$emit('moveNext')"></button>

            </header>

            <div class="card-info">

                <div class="card-info__title">{{ showDateObj }}</div>

                <div class="card-info__week">
                    <div v-for="item in week" class="card-info__week card-info__week_item">{{ item }}</div>
                </div>

                <div class="card-info__days">


                    <div class="card-info__days_item" v-for="dateObj in dateObjs" @click="daySelected(dateObj)"
                        @mousedown="$emit('handleMouseDown', dateObj)" @mouseenter="mouseEnter(dateObj)"
                        :class="getDateClasses(dateObj)">
                        {{ dateObj.getDate() }}
                    </div>
                </div>

            </div>
        </div>
    </div>



</template>

<style scoped lang="scss">
.calendar-card__item {
    width: 200px;
    position: relative;
    user-select: none;

    padding: 0 20px 40px;
  

    font-size: 14px;
}

.calendar-card__buttons-wrapper {
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

.btnPrevious {
    background-image: url(../assets/2.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    left: -25px;
}

.card-info__title {
    position: absolute;
    top: 5px;
    left: 70px;
}

.card-info__week {
    display: flex;
    margin-bottom: 10px;
    background-color: white;
    font-family: 'Courier New', Courier, monospace;
    color: #1a1111;

    &_item {
        color: $color;
    }
}

.card-info__week_item {
    display: flex;
    flex: 1 1 auto;
}

.card-info__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 10px;
    background-color: white;
    font-size: 12px;
}

.card-info__days_item {
    display: flex;
    flex: 1 1 auto;

}


.selected-date {
    background-color: blue;
    color: white;
    border-radius: 100%;
}

.not-current-month-day {
    color: grey;
}

.current-date {
    color: blue;
}

.range-date {
    background-color: rgba(52, 82, 255, 0.1);
}






/* 






.weekIntervalPoints {
    background-color: rgb(133, 133, 209);
    border-radius: 100%;
}

    .calendar-card__week {
        display: flex;
        margin-bottom: 10px;
        background-color: white;
    }
    
    .current-date {
  color: blue;
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
} */
</style>