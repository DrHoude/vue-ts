<script setup lang="ts">


import RadioComp from './components/RadioComp.vue';
import GeneralConfigVue from './components/GeneralConfig.vue';

import { ref,watch } from 'vue'
import Test from './components/test comp/test.vue';

const message = ref('mess');

const value = ref('');

const updateTheme = (event: any) => {

  
   if (event.target.id == 2 ) {
    document.documentElement.setAttribute('theme', 'dark-theme');
   }
   if (event.target.id == 1) {
    document.documentElement.removeAttribute('theme');
   } 

  
}

</script>

<template>
 
  <div class="app">

    <RadioComp name="radio1" theme ="Theme" option1="val1" option2="val2" @radio-click="updateTheme"/>

    <GeneralConfigVue/>

    

    

  


    
  </div>

</template>

<style>
@import './style.css';
  body{
    background-color: var(--generalBackground);
    
    

  }
</style>
