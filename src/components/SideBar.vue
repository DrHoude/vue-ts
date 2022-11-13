<script setup lang="ts">

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

    function updateDateByOption(option: string) {
         let newDate: Date | undefined = props.date

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
                let from = new Date()
                from.setDate(from.getDate()-7)
                updateInterval({from: from, to:new Date()})
         
        }


    }

</script>


<template>
    <div class="options" >
                <ul >
                    <li><input type="button" value="Today" @click="updateDateByOption('showToday')"></li>
                    <li><input type="button" value="Yesterday" @click="updateDateByOption('showYesterday')"></li>
                    <li><input type="button" value="Last 7 days" @click="updateDateByOption('showWeek')" ></li>
                    <li><input type="button" value="Last 14 days"></li>
                    <li><input type="button" value="Last 30 days"></li>
                    <li><input type="button" value="Whole period"></li>
                    <li><input type="button" value="Custom"></li>
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
        background-color: white;
        
    }

</style>