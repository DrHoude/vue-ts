<script setup lang="ts">
import RadioCompVue  from './RadioComp.vue';
import CalendarVue from './Input.vue';

import { onMounted, ref } from 'vue';


const props = defineProps ({
        showTime: Boolean,
        showTypeDayMonth: Boolean
    })



const type = ref(true)
const seen = ref(true)

const emit = defineEmits< {
    (e: 'updateInputType', value: Boolean):Boolean
    (e: 'updateTypeValue', value: Boolean):Boolean
}>()



const showTimeSelected = () => {
    seen.value = !seen.value
    emit('updateInputType', seen.value )
    console.log(seen.value)
}

const showTypeDayMonth = () => {
    type.value = !type.value
    emit('updateTypeValue', type.value)
    console.log(type.value)
}




</script>


<template>

    <div class="container">
        <div>
            <h1>General Configuration</h1>
            <RadioCompVue name="radio2" theme ="Show time" option1="Yes" option2="No" @radio-click="showTimeSelected"/>
            <RadioCompVue name="radio3" theme ="Type" option1="Day" option2="Month" @radio-click="showTypeDayMonth"/>
            <RadioCompVue name="radio4" theme ="Mode" option1="Single" option2="Multi" @radio-click=""/>

           
        </div>
    </div>

</template>

<style scoped>
.container {
    display: flex;
}

h1 {
    margin: 0;
    line-height: 40px;
}
</style>