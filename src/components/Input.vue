<script setup lang="ts">

const props = defineProps ({
    currentDateString: String
})
 
</script>

<template>
    <div id="wrapper"> 
        <div>{{props.currentDateString}}</div>
    </div>
</template>

<style scoped>
#wrapper {
    min-height: 20px;
    padding: 5px;
    margin-top: 10px;

    max-width: 200px;
    background-color: white;
    
    
}
</style>