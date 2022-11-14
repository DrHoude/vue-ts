<script setup lang="ts">

import { DateInterval } from '../types'
import { PropType } from 'vue';

import { formatDateFull } from '../utils';
import { computed } from '@vue/reactivity';


const props = defineProps({
 

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



</script>


<template>
    <div class="wrapper">
        <div>{{from}}</div>
        <input type="time" :value="props.dateInterval.from">
        <div>{{to}}</div>
        <input type="time">
    </div>
</template>

<style>

    .wrapper {
        width: 400px;
        display: flex;
        justify-content: space-between;
    }

</style>