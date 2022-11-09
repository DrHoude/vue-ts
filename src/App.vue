<script setup lang="ts">


import RadioComp from './components/RadioComp.vue';
import GeneralConfigVue from './components/GeneralConfig.vue';
import DatePickerVue from './components/DatePicker.vue';
import { ref} from 'vue'
import { computed } from '@vue/reactivity';



const showTimeType = ref(true);

const showTypeDayMonth = ref(false);



const updateTheme = (event: any) => {

   if (event.target.id == 2 ) {
    document.documentElement.setAttribute('theme', 'dark-theme');
   }
   if (event.target.id == 1) {
    document.documentElement.removeAttribute('theme');
   } 
}

function getInputType(seen:any) {
  showTimeType.value = seen
}

function getTypeDayMonth(type: any) {
  showTypeDayMonth.value = type
}



</script>

<template>
 
  <div class="app">

    <div>
      <RadioComp name="radio1" theme ="Theme" option1="val1" option2="val2" @radio-click="updateTheme"/>
      <GeneralConfigVue  @update-input-type="getInputType" @update-type-value="getTypeDayMonth"/>
    </div>

    <div>
      <DatePickerVue :show-time="showTimeType" :show-type-day-month="showTypeDayMonth"/>
    </div>

  
  </div>

</template>

<style>
@import './style.css';
  body{
    background-color: var(--generalBackground);
  }

  .app {
    display: flex;
  }
</style>
