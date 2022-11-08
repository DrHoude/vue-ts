<script setup lang="ts">

import InputVue from './Input.vue' 

import CalendarsWrapper from './CalendartsWrapper.vue'

import { ref } from 'vue';


const date = ref(new Date())

</script>

<template>
    <div class="container">
        <InputVue/>
        <CalendarsWrapper :date="date"/>
    </div>
    
</template>

<style scoped>
    .container {
        margin-left: 30px;
        
    }
</style>