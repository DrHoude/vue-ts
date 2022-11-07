<script setup lang="ts">
import RadioCompVue  from './RadioComp.vue';
import CalendarVue from './Calendar.vue';

import { ref } from 'vue';

const seen = ref(true)

</script>


<template>

    <div class="container">
        <div>
        <h1>General Configuration</h1>
        <RadioCompVue name="radio2" theme ="Show time" option1="Yes" option2="No" @radio-click="seen = !seen"/>
        <RadioCompVue name="radio3" theme ="Tipe" option1="Day" option2="Month" @radio-click=""/>
        <RadioCompVue name="radio4" theme ="Mode" option1="Single" option2="Multi" @radio-click=""/>
    </div>

    <div>
        <CalendarVue :showTime="seen"/>

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