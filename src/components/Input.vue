<script setup lang="ts">

const props = defineProps ({
    currentDateString: String
})
 
</script>

<template>
    <div class="date-container__input"> 
        <div>{{props.currentDateString}}</div>
    </div>
</template>

<style scoped>
.date-container__input {
    min-height: 20px;
    padding: 5px;
    margin-top: 10px;
    width: 200px;
    background-color: white;
    font-size: 14px;
    
    
}
</style>