<script setup lang="ts">

import { defineProps,computed,ref } from 'vue';

import { formatDateTitle } from '../utils';


const props = defineProps ({
    date: Date
})
 
const showDate = ref(props.date)



let showDateString = computed(() => {
    return formatDateTitle(new Date(data.value))
})


</script>

<template>
    <div>{{showDateString}}</div>
    
</template>