<script setup lang="ts">

import { DateInterval } from '../types'
import { PropType } from 'vue';

import { formatDateFull } from '../utils';
import { computed } from '@vue/reactivity';

import { ref,Ref } from 'vue';


const props = defineProps({
    date: Date,
    timeInput: Boolean,

    dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
})

const from = computed(()=>{
    return `${formatDateFull(props.dateInterval.from,{hideTime: true})}`
})

const to = computed(()=>{
    return `${formatDateFull(props.dateInterval.to,{hideTime: true})}`
})

const time = computed(()=> {
    return `${props.date?.getHours()}:${props.date?.getMinutes()}`
})




</script>


<template>
    <div class="wrapper">
        <label>{{from}}</label>
        <input type="time" :value="time">
        <label>{{to}}</label>
        <input type="time" :value="time">
    </div>

   
</template>

<style>

    .wrapper {
        width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>