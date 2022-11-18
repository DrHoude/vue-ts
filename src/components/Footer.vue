<script setup lang="ts">

import { DateInterval } from '../types'
import { PropType } from 'vue';

import { formatDateFull } from '../utils';
import { computed } from '@vue/reactivity';

import { ref,Ref } from 'vue';


const props = defineProps({
    date: Date,
    showTime:Boolean,


    dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
})

const emit = defineEmits<{
        (e: 'updateDateInterval', value: DateInterval ): void 
    }>()

const from = computed(()=>{
    return `${formatDateFull(props.dateInterval.from,{hideTime: true})}`
})

const to = computed(()=>{
    return `${formatDateFull(props.dateInterval.to,{hideTime: true})}`
})

const time = computed(()=> {
  return `${props.date?.getHours()}:${props.date?.getMinutes()}`
})


const formatTimeValue = (value: number) => {
    return value < 10 ? `0${value}` : value
}

const getFormatedTimeFromDate = (date: Date) => `${formatTimeValue(date.getHours())}:${formatTimeValue(date.getMinutes())}`

const fromTime = computed(()=> getFormatedTimeFromDate(props.dateInterval.from))
const toTime = computed(()=> getFormatedTimeFromDate(props.dateInterval.to))

const handleInputChange = (e: Event) => {
    const { value, name } = (e.target as HTMLInputElement)

    const newDateInterval = { ... props.dateInterval }
    

    const timeArr = value.split(':')
    newDateInterval[name as 'from' | 'to'].setHours(parseInt(timeArr[0]))
    newDateInterval[name as 'from' | 'to'].setMinutes(parseInt(timeArr[1]))
    emit('updateDateInterval', newDateInterval)
}


</script>


<template>
    <div class="footer-container">
        <div class="footer-container__items">
            <label>{{from}}</label>
            <input type="time" :value="fromTime" name="from" @change="handleInputChange">
            <label>{{to}}</label>
            <input type="time" :value="toTime" name="to" @change="handleInputChange">
        </div>
       
    </div>

   
</template>

<style>

    .footer-container {
        border-top: 1px solid rgb(218, 209, 209);
        
    }

    .footer-container__items {
        width: 430px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }

</style>