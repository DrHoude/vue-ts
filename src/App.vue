<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import RadioComp from './components/serve/RadioComp.vue';

import { ref,watch } from 'vue'

const message = ref('mess');

const value = ref('');

const updateTheme = (event: InputEvent) => document.documentElement.setAttribute('theme', 'dark-theme')  

</script>

<template>
 
  <div class="app">
    <RadioComp theme ="Theme" option1="val1" option2="val2" @radio-click="updateTheme"/>
    
  </div>

</template>

<style scoped>
@import './style.css';
  .app{
    background-color: var(--generalBackground);
  }
</style>
