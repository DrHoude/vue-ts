<script setup lang="ts">

import { stringifyStyle } from '@vue/shared';
import { ref,watch } from 'vue'

const props = defineProps({
    
    theme: String,
    option1: String,
    option2: String,
    name: String,
    value: String,
    options: Array,

    
})




</script>

<template>

  

    <!-- <div>{{theme}}</div>

    <input v-bind:name="name" type="radio" id="1" :checked="props.value === option1" @change="$emit('radio-click', $event)"  />
    <label for="1">{{option1}}</label>

    <input v-bind:name="name" type="radio" id="2" :checked="props.value === option2" @change="$emit('radio-click', $event)" />
    <label for="2">{{option2}}</label> -->
    
    <div class="radio-wrapper">
        <div v-for="option in props.options">
            <input 
            :name="name" type="radio" :checked="props.value === option"  @change="$emit('radio-click', $event)" />
            <label>{{option}}</label>
        </div>
    </div>
  
</template>

<style scoped>

.radio-wrapper {
    display: flex;
}
</style>