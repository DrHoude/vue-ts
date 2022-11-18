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


const emit = defineEmits< {
    (e: 'updateShowTime'): void
    (e: 'updateTypeValue'): void
    (e: 'updateTypeMode'): void
}>()

const selectedType = computed(() => props.showTypeDayMonth ? 'Month': 'Day')
const selectedShowTime = computed(() => props.showTime ? 'Yes': 'No')
const selectedMode = computed(() => props.showTypeMode ? 'Multi': 'Single')




const optionsTime = ref(['Yes', 'No'])
const optionsType = ref(['Month', 'Day'])
const optionsMode = ref(['Single', 'Multi'])

</script>


<template>

    <div class="config-container">
        <div class="config-container__options">
            <h3>General Configuration</h3>

            <div class="config-container__option"> Show Time:
                <RadioCompVue name="radioTime" :options="optionsTime" :value="selectedShowTime" @radio-click="emit('updateShowTime')"/>
            </div>

            <div class="config-container__option">Type:
                <RadioCompVue name="radioTypeDayMonth" :options="optionsType" :value="selectedType" @radio-click="emit('updateTypeValue')"/>
            </div>

            <div class="config-container__option">Mode:
                <RadioCompVue name="radioTypeMode" :options="optionsMode" :value="selectedMode" @radio-click="emit('updateTypeMode')"/> 
            </div>

          
        </div>
    </div>

</template>

<style scoped>
.config-container {
    display: flex;
}

.config-container__option {
    margin-bottom: 15px;
}
    
</style>