<script setup lang="ts">

import { stringifyStyle } from '@vue/shared';
import { ref,watch } from 'vue'

const props = defineProps({
    
    theme: String,
    option1: String,
    option2: String,
    name: String
})




</script>

<template>

  

    <div>{{theme}}</div>

    <input v-bind:name="name" type="radio" id="1" checked @change="$emit('radio-click', $event)"/>
    <label for="1">{{option1}}</label>

    <input v-bind:name="name" type="radio" id="2" @change="$emit('radio-click', $event)" />
    <label for="2">{{option2}}</label>


    

 


</template>