<script setup lang="ts">

import { DateInterval } from '../types'
import { PropType } from 'vue';
import { formatDateFull } from '../utils';
import { computed } from '@vue/reactivity';


const props = defineProps({
    date: {
        type: Date,
        default: new Date()
    },

    showTime: {
        type: Boolean,
        default: true
    },


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

            <div>
                <label>{{from}} - </label>
                <input type="time" :value="fromTime" name="from" @change="handleInputChange" data-test="input">
            </div>

            <div>
                <label>{{to}} - </label>
                <input type="time" :value="toTime" name="to" @change="handleInputChange" data-test="input">
            </div>
           
        </div>
       
    </div>

   
</template>

<style scoped lang="scss">

    .footer-container {
        border-top: 1px solid rgb(218, 209, 209);
        font-size: 14px;
        
        &__items {
            display: flex;
            justify-content: space-around;
            max-width: 450px;
            margin: 0 auto;
            padding: 15px 0;   
        } 
    }

</style>