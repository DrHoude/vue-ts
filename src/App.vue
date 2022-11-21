<script setup lang="ts">


import RadioCompVue from './components/RadioComp.vue';
import GeneralConfigVue from './components/GeneralConfig.vue';
import DatePickerVue from './components/DatePicker.vue';
import { ref, computed } from 'vue'

const showTimeType = ref(true);

const showTypeDayMonth = ref(false);

const showTypeTheme = ref(true);

const showTypeMode = ref(true);



const optionsTheme = ref(['light', 'dark'])

const selectedTheme = computed(() => showTypeTheme.value ? 'light': 'dark')

const updateShowTypeTheme = (()=> {
  showTypeTheme.value = !showTypeTheme.value
  document.body.classList.toggle('dark');

 


  
})


</script>

<template>
 
  <div class="app">

    <div>
      <div>Theme:</div>
      <RadioCompVue name="radio4" :options="optionsTheme" :value="selectedTheme" @radio-click="updateShowTypeTheme"/>

      <GeneralConfigVue  
        :show-type-day-month="showTypeDayMonth" 
        :show-time="showTimeType"
        :show-type-mode="showTypeMode"
        @update-type-value="showTypeDayMonth = !showTypeDayMonth" 
        @update-show-time="showTimeType = !showTimeType"
        @update-type-mode="showTypeMode = !showTypeMode"
      />

    </div>

    <div>
      <DatePickerVue :show-time="showTimeType" :show-type-day-month="showTypeDayMonth" :show-type-mode="showTypeMode"/>
    </div>

  
  </div>

</template>

<style lang="scss">

@import './style.scss';


.dark {
  background-color: rgb(185, 150, 150);
}

  .app {
    display: flex;
  }
</style>
