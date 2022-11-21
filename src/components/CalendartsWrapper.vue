<script setup lang="ts">

import DateCalendarVue from './DateCalendar.vue';
import MonthCalendarVue from './MonthCalendar.vue';

import { PropType } from 'vue'
import { DateInterval } from '../types'
import { isAfterDay, isAfterMonth, isSameDate } from '../utils';



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
    (e: 'moveNext'):void
}>()

let isMouseDown = false;

function updateDate(date: Date) {
    emit('update-date', date )
}

function updateInterval(value:DateInterval) {
    emit('updateDateInterval', value)
}

function handleMouseUp() {
    console.log('mouseUp')
    removeEventListener('mouseup', handleMouseUp)
    isMouseDown = false;
}

function handleMouseDown(date: Date) {
    updateInterval({from: date, to: date})
    addEventListener('mouseup', handleMouseUp)
    isMouseDown = true;
}

function handleMouseEnterDay(date: Date, lastDay: Date) {
    if(!isMouseDown) return
    const dayCond = !props.showTypeDayMonth && isAfterDay(props.dateInterval.from, date)
    if (!dayCond) return
    const isLastDay = isSameDate(lastDay, date, 'day')
    if (isLastDay) {
        console.log('yes')
        setTimeout(()=>emit('moveNext'),1000)
    }
    updateInterval({from: props.dateInterval.from, to: date})
}

function handleMouseEnterMonth(date: Date) {
    if(!isMouseDown) return
    const monthCond = props.showTypeDayMonth && isAfterMonth(props.dateInterval.from, date)
    if (!monthCond) return
    const lastMonth = new Date(props.calendarToShowingDate!.getFullYear(), 11)
    const isLastMonth = isSameDate(lastMonth, date, 'month')
    if (isLastMonth) {
        setTimeout(()=>emit('moveNext'),1000)
    }
    updateInterval({from: props.dateInterval.from, to: date})
}

</script>


<template>
    <div>
            <div class="calendar-container__cards" v-if="!props.showTypeDayMonth">

                <DateCalendarVue
                    :is-last="false"
                    :date="date"
                    :showingDate="calendarFromShowingDate" 
                    :leftArrow="true"
                    :dateInterval="props.dateInterval"
                    @update-date ="updateDate" 
                    @moveBack="$emit('moveBack')"
                    @updateDateInterval="(value) => $emit('updateDateInterval', value)"
                    @handle-mouse-down="handleMouseDown"
                    @handle-mouse-enter="handleMouseEnterDay"
                />

                <DateCalendarVue
                    :is-last="true"
                    :date="date"
                    :showingDate="calendarToShowingDate" 
                    :rightArrow="true" 
                    :dateInterval="props.dateInterval"
                    @update-date="updateDate" 
                    @moveNext="$emit('moveNext')"
                    @updateDateInterval="(value) => $emit('updateDateInterval', value)"
                    @handle-mouse-down="handleMouseDown"
                    @handle-mouse-enter="handleMouseEnterDay"
                />
            </div>


            <div class="calendar-container__cards" v-else>

                <MonthCalendarVue
                    :showingDate="calendarFromShowingDate" 
                    :leftArrow="true"
                    :dateInterval="props.dateInterval"
                    @moveBack="$emit('moveBack')"
                    @updateDateInterval="(value) => $emit('updateDateInterval', value)"
                    @update-month="updateDate"
                    @handle-mouse-down="handleMouseDown"
                    @handle-mouse-enter="handleMouseEnterMonth"
                />

                <MonthCalendarVue
                    :showingDate="calendarToShowingDate" 
                    :rightArrow="true" 
                    :dateInterval="props.dateInterval"
                    @moveNext="$emit('moveNext')"
                    @updateDateInterval="(value) => $emit('updateDateInterval', value)"
                    @update-month="updateDate"
                    @handle-mouse-down="handleMouseDown"
                    @handle-mouse-enter="handleMouseEnterMonth"
                />
            </div>            
        </div>
    
</template>

<style scoped>

    .calendar-container__cards {
        padding: 0 20px;
        width: 550px;
        display: flex;
        justify-content: space-around;   
    }


   

</style>