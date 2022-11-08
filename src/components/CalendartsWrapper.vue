<script setup lang="ts">
import Calendar from './Calendar.vue'

import { ref } from 'vue'


const props = defineProps ({
    date: Date
})

const calendarFromShowingDate = ref(new Date())
const calendarToShowingDate = ref(new Date())

</script>


<template>
    <div class="container">
        <Calendar :date = "date" :showingDate="calendarFromShowingDate" @update:date="updateDate" @moveBackward="updateShowingDateBackword"/>
        <Calendar :date = "date" :showingDate="calendarToShowingDate" @update:date="updateDate" @moveForward="updateShowingDateForward"/>
    </div>
    
</template>

<style scoped>

    .container {
        background-color: white;
        height: 200px;
        width: 600px;
        margin-top: 20px;
    }

</style>