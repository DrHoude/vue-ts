<script setup lang="ts">

import { ref } from 'vue';
import { DateInterval } from '../types';
    const props = defineProps({
        date: Date
    })

    const emit = defineEmits< {
        (e: 'update-date', value: Date):void
        (e: 'updateDateInterval', value: DateInterval):void

    }>()


    function updateDate(date: Date) {
    emit('update-date', date )
    
    }

    function updateInterval(value:DateInterval) {
        emit('updateDateInterval', value)

    }

    function updateDateByOption(option?: string) {
         let newDate: Date | undefined = props.date
         let from;

        switch (option) {
            case 'showToday':
            newDate = new Date()
             updateDate(newDate!)

                break;
            case 'showYesterday':
            newDate = new Date()
            newDate.setDate(newDate.getDate()-1)
               updateDate(newDate!)

                break;
            case 'showWeek':
                from = new Date()
                from.setDate(from.getDate()-7)
                updateInterval({from: from, to:new Date()})
                break;
            
            case 'show14Days':
                from = new Date()
                from.setDate(from.getDate()-14)
                updateInterval({from:from, to:new Date()})
                break;
            
            case 'showMonth':
                from = new Date()
                from.setDate(from.getDate()-30)
                updateInterval({from:from, to: new Date()})
                break;

            case 'showWholePeriod':
                from = new Date(2022,3)
                updateInterval({from:from, to: new Date()})
                break;

            default: 
                updateDate(new Date())
        }


    }

    const selectedOption = ref<string | undefined>()


    function handleOptionClick(option?: string) {
        updateDateByOption(option)
        selectedOption.value = option
        console.log(selectedOption)
    }

    function getOptionClass(option?: string) {
        return {"active-option": option === selectedOption.value}
    }

    const values = [
    {value:'Today', key: 'showToday'},
    {value:'Yesterday', key: 'showYesterday'},
    {value:'Last 7 days', key: 'showWeek'},
    {value:'last 14 days', key: 'show14Days'},
    {value:'Last 30 days', key: 'showMonth'},
    {value:'Whole period', key: 'showWholePeriod'},
    {value:'Custom', key: undefined}]

</script>


<template>
    <div class="options" >
                <ul >
                    <!-- <li :class="getOptionClass('showToday')"><input type="button" value="Today" @click="handleOptionClick('showToday')"></li>
                    <li :class="getOptionClass('showYesterday')"><input type="button" value="Yesterday" @click="handleOptionClick('showYesterday')"></li>
                    <li :class="getOptionClass('showWeek')"><input type="button" value="Last 7 days" @click="handleOptionClick('showWeek')" ></li>
                    <li :class="getOptionClass('show14Days')"><input type="button" value="Last 14 days" @click="handleOptionClick('show14Days')"></li>
                    <li :class="getOptionClass('showMonth')"><input type="button" value="Last 30 days" @click="handleOptionClick('showMonth')"></li>
                    <li :class="getOptionClass('showWholePeriod')"><input type="button" value="Whole period" @click="handleOptionClick('showWholePeriod')"></li>
                    <li :class="getOptionClass()"><input type="button" value="Custom" @click="handleOptionClick()"></li> -->
                    <li v-for="(value, index) in values" :key="index"
                    :class="getOptionClass(value.key)">
                        <input type="button" :value="value.value" @click="handleOptionClick(value.key)"></li>
                </ul>
                
            </div>


</template>


<style scoped>

    ul {
            list-style: none;
        }

    input {
        cursor: pointer;
        border: none;
        background: none;
        
    }

    li {
        background-color: white;
    }

    .active-option {
        background-color: blueviolet;
        color: white;
    }

</style>