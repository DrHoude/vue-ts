<script setup lang="ts">

import { ref } from 'vue';
import { DateInterval } from '../types';
    const props = defineProps({
        date: Date,
        showMonths: Boolean,
        selectedOption: String
       
    })

   const hover = ref(false)

    

    const emit = defineEmits< {
        (e: 'update-date', value: Date):void
        (e: 'updateDateInterval', value: DateInterval):void
        (e:'updateSelectedOption',value:any):void

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
             updateInterval({from:newDate, to: newDate})

                break;
            case 'showYesterday':
            newDate = new Date()
            newDate.setDate(newDate.getDate()-1)
               updateDate(newDate!)
               updateInterval({from:newDate, to: newDate})
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

            case 'showThisMonth':
                newDate = new Date()
                updateDate(newDate!)
                break;


            case 'showLastMonth':
                newDate = new Date()
                newDate.setMonth(newDate.getMonth()-1)
                updateDate(newDate!)
                break;

            
            case 'showThreeMonths':
                from = new Date()
                from.setMonth(from.getMonth()-3)
                updateInterval({from:from, to: new Date()})
                break;

            case 'showSixMonths':
                from = new Date()
                from.setMonth(from.getMonth()-6)
                updateInterval({from:from, to: new Date()})
                break;

            case 'showYear':
                from = new Date()
                from.setMonth(from.getMonth()-12)
                updateInterval({from:from, to: new Date()})
                break;

            default: 
            updateInterval({from:new Date(), to: new Date()}) 
        }
    }

    function handleOptionClick(option?: string) {
        updateDateByOption(option)
        emit('updateSelectedOption', option)
    }

    function getOptionClass(option?: string) {
        return {"calendar-sideBar__item_selected": option === props.selectedOption }
    }

    const daysOptions = [
        {value:'Today', key: 'showToday'},
        {value:'Yesterday', key: 'showYesterday'},
        {value:'Last 7 days', key: 'showWeek'},
        {value:'last 14 days', key: 'show14Days'},
        {value:'Last 30 days', key: 'showMonth'},
        {value:'Whole period', key: 'showWholePeriod'},
        {value:'Custom', key: undefined}
    ]

    const monthsOptions = [
        {value:'This Month', key:'showThisMonth'},
        {value:'Last Month', key:'showLastMonth'},
        {value:'Last 3 Months', key:'showThreeMonths'},
        {value:'Last 6 Months',key:'showSixMonths'},
        {value:'Last 12 Months', key:'showYear'},
        {value:'Custom', key:undefined}
    ]

</script>


<template>
    <div class="calendar-sideBar" >

        <div class="calendar-sideBar__header">SELECT BY</div>

        <ul v-if="!props.showMonths" class="calendar-sideBar__content" >
            <li v-for="(dayOption, index) in daysOptions" :key="index"
                :class="getOptionClass(dayOption.key)" class="calendar-sideBar__item" 
            >
            <input   type="button" :value="dayOption.value" @click="handleOptionClick(dayOption.key)" class=" calendar-sideBar__input"
            @mouseover="hover = true" @mouseleave="hover=false"></li>
        </ul>

        <ul v-else class="calendar-sideBar__content">
            <li v-for="(monthOption, index) in monthsOptions" :key="index"
                :class="getOptionClass(monthOption.key)" class="calendar-sideBar__item" >
            <input  type="button" :value="monthOption.value" @click="handleOptionClick(monthOption.key)" class=" calendar-sideBar__input "></li>
        </ul>
                
    </div>


</template>


<style scoped>
    .calendar-sideBar {
       padding: 20px 0 0 30px;
        width: 120px;
        border-right: 1px solid rgb(218, 209, 209);
    
    }

    .calendar-sideBar__header {
        padding-left: 10px;
        font-size: 10px;
        color: grey;
    }

    .calendar-sideBar__content {
        list-style: none;
        padding: 0;
    }

    .calendar-sideBar__item {
        
        border: none;
        background: none;
        width: 100px;
        padding-bottom: 10px;  
    }
    .calendar-sideBar__item:hover {
        background-color: rgb(211, 197, 197);
    }
    .calendar-sideBar__input {
        cursor: pointer;
        background: none;
        border: none;
    }
    .calendar-sideBar__item_selected {
        background-color: blueviolet;
        color: white;
    }

   

</style>