<script setup lang="ts">
import RadioCompVue  from './RadioComp.vue';
import CalendarVue from './Input.vue';

import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';


const props = defineProps ({
        showTime: Boolean,
        showTypeDayMonth: Boolean,
        showTypeMode: Boolean
    })

console.log(props.showTypeMode)
const emit = defineEmits< {
    (e: 'updateShowTime'): void
    (e: 'updateTypeValue'): void
    (e: 'updateTypeMode'): void
}>()

const selectedType = computed(() => props.showTypeDayMonth ? 'Month': 'Day')
const selectedShowTime = computed(() => props.showTime ? 'Yes': 'No')
const selectedMode = computed(() => props.showTypeMode ? 'Multi': 'Single')

console.log(selectedShowTime.value)



const optionsTime = ref(['Yes', 'No'])
const optionsType = ref(['Month', 'Day'])
const optionsMode = ref(['Single', 'Multi'])

</script>


<template>

    <div class="container">
        <div>
            <h3>General Configuration</h3>
            <!-- <RadioCompVue name="radio2" theme ="Show time" option1="Yes" option2="No" :value="selectedShowTime" @radio-click="emit('updateShowTime')"/>
            <RadioCompVue name="radio3" theme ="Type" option1="Day" option2="Month" :value="selectedType" @radio-click="emit('updateTypeValue')"/>
            <RadioCompVue name="radio4" theme ="Mode" option1="Single" option2="Multi" :value="selectedMode" @radio-click=""/> -->

            <RadioCompVue name="radioTime" :options="optionsTime" :value="selectedShowTime" @radio-click="emit('updateShowTime')"/>
            <RadioCompVue name="radioTypeDayMonth" :options="optionsType" :value="selectedType" @radio-click="emit('updateTypeValue')"/>
            <RadioCompVue name="radioTypeMode" :options="optionsMode" :value="selectedMode" @radio-click="emit('updateTypeMode')"/> 

          
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